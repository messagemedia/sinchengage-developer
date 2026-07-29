import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const SPEC_PATH = path.join(root, '.tmp', 'openapi.bundled.yaml');
const SAMPLES_DIR = path.join(root, 'spec', 'code_samples');
const OUT_DIR = path.join(root, '.tmp');
const OUT_PATH = path.join(OUT_DIR, 'openapi.injected.yaml');

const LANG_ORDER = ['C#', 'Java', 'JavaScript', 'PHP', 'Python', 'Ruby'];
const LANG_EXTENSIONS = {
  'C#': new Set(['.cs']),
  Java: new Set(['.java']),
  JavaScript: new Set(['.js', '.mjs', '.cjs', '.ts']),
  PHP: new Set(['.php']),
  Python: new Set(['.py']),
  Ruby: new Set(['.rb']),
};
const HTTP_METHODS = new Set([
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
]);

function walkFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) {
    return results;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full));
    } else if (entry.isFile() && entry.name !== 'README.md') {
      results.push(full);
    }
  }
  return results;
}

function parseSamplePath(filePath) {
  const rel = path.relative(SAMPLES_DIR, filePath);
  const parts = rel.split(path.sep);
  if (parts.length < 3) {
    return null;
  }

  const lang = parts[0];
  const verbWithExt = parts[parts.length - 1];
  const dirParts = parts.slice(1, -1);
  const parsed = path.parse(verbWithExt);
  const verb = parsed.name.toLowerCase();
  const ext = parsed.ext.toLowerCase();
  const pathKey = '/' + dirParts.join('/').replaceAll('@', '/');

  return { lang, pathKey, verb, ext };
}

function sortSamples(samples) {
  return samples.sort((a, b) => {
    const ai = LANG_ORDER.indexOf(a.lang);
    const bi = LANG_ORDER.indexOf(b.lang);
    const aRank = ai === -1 ? LANG_ORDER.length : ai;
    const bRank = bi === -1 ? LANG_ORDER.length : bi;
    if (aRank !== bRank) {
      return aRank - bRank;
    }
    return a.lang.localeCompare(b.lang);
  });
}

function main() {
  const raw = fs.readFileSync(SPEC_PATH, 'utf8');
  const spec = yaml.load(raw);

  if (!spec.paths) {
    throw new Error('OpenAPI spec has no paths');
  }

  let injected = 0;
  let skipped = 0;
  const errors = [];

  for (const filePath of walkFiles(SAMPLES_DIR)) {
    const parsed = parseSamplePath(filePath);
    if (!parsed) {
      console.warn(`Skipping unexpected sample path: ${filePath}`);
      skipped += 1;
      continue;
    }

    const { lang, pathKey, verb, ext } = parsed;
    const rel = path.relative(root, filePath);
    const allowedExts = LANG_EXTENSIONS[lang];

    if (!allowedExts) {
      errors.push(`Unknown language folder "${lang}" (${rel})`);
      continue;
    }
    if (!allowedExts.has(ext)) {
      errors.push(
        `Extension ${ext || '(none)'} does not match language "${lang}" (${rel}); expected ${[...allowedExts].join(', ')}`,
      );
      continue;
    }

    const source = fs.readFileSync(filePath, 'utf8');
    if (source.trim() === '') {
      errors.push(`Empty code sample (${rel}); remove it or add real source`);
      continue;
    }

    const operation = spec.paths?.[pathKey]?.[verb];

    if (!operation || typeof operation !== 'object' || !HTTP_METHODS.has(verb)) {
      console.warn(
        `No matching operation for ${lang} ${verb.toUpperCase()} ${pathKey} (${rel})`,
      );
      skipped += 1;
      continue;
    }

    if (!Array.isArray(operation['x-codeSamples'])) {
      operation['x-codeSamples'] = [];
    }

    operation['x-codeSamples'].push({
      lang,
      label: lang,
      source,
    });
    injected += 1;
  }

  if (errors.length > 0) {
    console.error('Code sample validation failed:');
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exitCode = 1;
    return;
  }

  for (const pathItem of Object.values(spec.paths)) {
    if (!pathItem || typeof pathItem !== 'object') {
      continue;
    }
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!HTTP_METHODS.has(method) || !operation?.['x-codeSamples']) {
        continue;
      }
      operation['x-codeSamples'] = sortSamples(operation['x-codeSamples']);
    }
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    OUT_PATH,
    yaml.dump(spec, {
      lineWidth: -1,
      noRefs: true,
      quotingType: '"',
    }),
    'utf8',
  );

  console.log(
    `Injected ${injected} code sample(s); skipped ${skipped}. Wrote ${path.relative(root, OUT_PATH)}`,
  );
}

main();
