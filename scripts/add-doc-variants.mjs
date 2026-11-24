// Adds docs-only "Send <type>" operations (see spec/doc-variants/message-types.yaml)
// to the ReDoc HTML build. Reads .tmp/openapi.injected.yaml, writes
// .tmp/openapi.docs.yaml. The published spec is NOT modified.
//
// Usage: node scripts/add-doc-variants.mjs [--config <path>]
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const IN_PATH = path.join(root, '.tmp', 'openapi.injected.yaml');
const OUT_PATH = path.join(root, '.tmp', 'openapi.docs.yaml');
const CURL_SAMPLE = path.join(root, 'spec', 'code_samples', 'curl', 'v1@messages', 'post.sh');

function argConfig() {
  const i = process.argv.indexOf('--config');
  if (i !== -1) {
    if (!process.argv[i + 1]) {
      fail(['--config requires a path']);
    }
    return path.resolve(process.argv[i + 1]);
  }
  return path.join(root, 'spec', 'doc-variants', 'message-types.yaml');
}

function fail(errors) {
  console.error('Doc variants validation failed:');
  for (const e of errors) {
    console.error(`  - ${e}`);
  }
  process.exit(1);
}

const clone = (v) => JSON.parse(JSON.stringify(v));

// Deterministic version-4-style UUID derived from a SHA-1 of the seed.
function stableUuid(seed) {
  const b = crypto.createHash('sha1').update(seed).digest().subarray(0, 16);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = b.toString('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

// 202 body for a request example: each message echoed in request order, with
// `format` first when the request omitted it, then message_id and status last.
function buildAccepted(operationId, exampleKey, example) {
  const messages = example.value.messages.map((m, i) => {
    const echoed = m.format
      ? { ...m }
      : { format: m.rich_content || m.suggestions ? 'RCS' : 'SMS', ...m };
    echoed.message_id = stableUuid(`${operationId}:${exampleKey}:${i}`);
    echoed.status = 'queued';
    return echoed;
  });
  return { summary: example.summary, value: { messages } };
}

function buildCurl(template, summary, example) {
  const json = JSON.stringify(example.value, null, 2);
  const re = /(<<'EOF'\n)[\s\S]*?(\nEOF\n)/;
  if (!re.test(template)) {
    fail([`cURL template ${path.relative(root, CURL_SAMPLE)} has no <<'EOF' ... EOF block`]);
  }
  let out = template.replace(re, (_, a, b) => `${a}${json}${b}`);
  const commentRe = /^# Minimal SMS.*$/m;
  if (!commentRe.test(out)) {
    fail([`cURL template ${path.relative(root, CURL_SAMPLE)} has no "# Minimal SMS..." comment line`]);
  }
  out = out.replace(commentRe, `# ${summary}. Same endpoint as Send messages.`);
  return out;
}

function main() {
  const configPath = argConfig();
  const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
  const spec = yaml.load(fs.readFileSync(IN_PATH, 'utf8'));
  const errors = [];

  const { path: srcPath, method, schema: schemaName } = config.source;
  const srcOp = spec.paths?.[srcPath]?.[method];
  if (!srcOp) {
    fail([`Source operation ${method.toUpperCase()} ${srcPath} not found in ${path.relative(root, IN_PATH)}`]);
  }
  const srcSchema = spec.components?.schemas?.[schemaName];
  if (!srcSchema?.properties) {
    fail([`Source schema components.schemas.${schemaName} not found or has no properties`]);
  }
  const srcExamples = srcOp.requestBody?.content?.['application/json']?.examples ?? {};
  const srcResponses = srcOp.responses ?? {};
  const curlTemplate = fs.readFileSync(CURL_SAMPLE, 'utf8');

  const seenKeys = new Set();
  const seenIds = new Set();
  for (const op of config.operations) {
    const where = `operation "${op.key}"`;
    if (seenKeys.has(op.key)) errors.push(`${where}: duplicate key`);
    seenKeys.add(op.key);
    if (seenIds.has(op.operationId)) errors.push(`${where}: duplicate operationId ${op.operationId}`);
    seenIds.add(op.operationId);
    if (spec.paths && Object.values(spec.paths).some((p) => Object.values(p).some((o) => o?.operationId === op.operationId))) {
      errors.push(`${where}: operationId ${op.operationId} already exists in the spec`);
    }
    for (const f of op.fields) {
      if (!(f in srcSchema.properties)) errors.push(`${where}: field "${f}" is not in schema ${schemaName}`);
    }
    for (const r of op.required) {
      if (!op.fields.includes(r)) errors.push(`${where}: required field "${r}" is not in fields`);
    }
    for (const e of op.examples) {
      if (!(e in srcExamples)) errors.push(`${where}: example "${e}" is not in the source operation examples`);
    }
    for (const r of op.responses) {
      if (!(r in srcResponses)) errors.push(`${where}: response "${r}" is not in the source operation responses`);
    }
    if (!op.markdown || !fs.existsSync(path.join(root, op.markdown))) {
      errors.push(`${where}: markdown file "${op.markdown}" does not exist`);
    }
    if (!op.examples?.length) errors.push(`${where}: needs at least one example`);
  }
  if (errors.length) fail(errors);

  const docPaths = {};
  const added = [];
  for (const op of config.operations) {
    const pathKey = `${srcPath}#${op.key}`;
    const d = clone(srcOp);
    d.operationId = op.operationId;
    d.summary = op.summary;
    d.description = op.description;

    const properties = {};
    for (const f of op.fields) {
      properties[f] = f === 'format'
        ? {
            type: 'string',
            enum: [op.format],
            description: op.format_required
              ? 'Required.'
              : 'Optional. When omitted, the channel is inferred (see Channel selection in Send messages).',
          }
        : clone(srcSchema.properties[f]);
    }
    d.requestBody = clone(srcOp.requestBody);
    d.requestBody.content['application/json'] = {
      schema: {
        type: 'object',
        required: ['messages'],
        properties: {
          messages: {
            type: 'array',
            description: 'List of messages.',
            items: {
              title: `${op.summary.replace(/^Send /, '')} message`,
              type: 'object',
              required: op.required,
              properties,
            },
          },
        },
      },
      examples: Object.fromEntries(op.examples.map((e) => [e, clone(srcExamples[e])])),
    };

    d.responses = {};
    for (const code of op.responses) {
      const r = clone(srcResponses[code]);
      if (code === '400' && op.key !== 'rcs') {
        delete r.content?.['application/json']?.examples?.richContentWithContent;
      }
      if (code === '202') {
        r.content['application/json'].examples = Object.fromEntries(
          op.examples.map((e) => [e, buildAccepted(op.operationId, e, srcExamples[e])]),
        );
      }
      d.responses[code] = r;
    }

    d['x-codeSamples'] = [
      {
        lang: 'curl',
        label: 'cURL',
        source: buildCurl(curlTemplate, op.summary, srcExamples[op.examples[0]]),
      },
    ];

    docPaths[pathKey] = { [method]: d };
    added.push(`${method.toUpperCase()} ${pathKey}  ${op.operationId}  (${op.fields.length} fields, ${op.examples.length} example(s))`);
  }

  const isMessagesPath = (item) =>
    Object.values(item ?? {}).some((o) => Array.isArray(o?.tags) && o.tags.includes('Messages'));
  const newPaths = {};
  let inserted = false;
  for (const [k, v] of Object.entries(spec.paths)) {
    if (!inserted && isMessagesPath(v)) {
      Object.assign(newPaths, docPaths);
      newPaths[config.insert_before_path] = spec.paths[config.insert_before_path];
      inserted = true;
    }
    if (k === config.insert_before_path) continue;
    newPaths[k] = v;
  }
  if (!inserted) fail(['No path tagged "Messages" found to anchor the doc operations']);
  spec.paths = newPaths;

  fs.writeFileSync(OUT_PATH, yaml.dump(spec, { lineWidth: -1, noRefs: true, quotingType: '"' }), 'utf8');
  for (const line of added) console.log(`Added ${line}`);
  console.log(`Wrote ${path.relative(root, OUT_PATH)}`);
}

main();
