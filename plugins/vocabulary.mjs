import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VOCAB_PATH = path.resolve(__dirname, '..', 'vocabulary.yaml');

function loadVocabulary() {
  const raw = fs.readFileSync(VOCAB_PATH, 'utf8');
  const doc = yaml.load(raw);
  if (!doc?.banned || !Array.isArray(doc.banned)) {
    throw new Error(`Invalid vocabulary file: ${VOCAB_PATH}`);
  }
  return doc.banned.map((entry) => {
    const flags = entry.flags || '';
    return {
      id: entry.id || entry.prefer || 'term',
      prefer: entry.prefer,
      message: entry.message || `Prefer "${entry.prefer}".`,
      allowIfMatches: entry.allow_if_matches || [],
      regex: new RegExp(entry.pattern, flags.includes('g') ? flags : `${flags}g`),
    };
  });
}

function stripAllowedPhrases(text, allowed) {
  let out = text;
  for (const phrase of allowed) {
    if (!phrase) continue;
    out = out.split(phrase).join(' '.repeat(phrase.length));
  }
  return out;
}

function findViolations(text, rules) {
  if (typeof text !== 'string' || text.length === 0) return [];
  const hits = [];
  for (const rule of rules) {
    const scrubbed = stripAllowedPhrases(text, rule.allowIfMatches);
    rule.regex.lastIndex = 0;
    const match = rule.regex.exec(scrubbed);
    if (match) {
      hits.push({ rule, match: match[0] });
    }
  }
  return hits;
}

function reportOnField(node, ctx, field, rules) {
  const value = node?.[field];
  const hits = findViolations(value, rules);
  for (const { rule, match } of hits) {
    ctx.report({
      message: `Controlled vocabulary (${rule.id}): found "${match}". ${rule.message}`,
      location: ctx.location.child(field),
    });
  }
}

function createVisitors(rules) {
  const checkDescriptionAndSummary = {
    enter(node, ctx) {
      reportOnField(node, ctx, 'summary', rules);
      reportOnField(node, ctx, 'description', rules);
    },
  };

  return {
    Info: checkDescriptionAndSummary,
    Tag: checkDescriptionAndSummary,
    Operation: checkDescriptionAndSummary,
    Parameter: checkDescriptionAndSummary,
    RequestBody: checkDescriptionAndSummary,
    Response: checkDescriptionAndSummary,
    Schema: checkDescriptionAndSummary,
    MediaType: {
      enter(node, ctx) {
        // examples are out of scope; only prose if present on extensions — skip
      },
    },
  };
}

export default function vocabularyPlugin() {
  const rules = loadVocabulary();
  const visitors = createVisitors(rules);
  const ruleFactory = () => visitors;

  return {
    id: 'vocabulary',
    rules: {
      oas3: {
        'controlled-terms': ruleFactory,
      },
      oas3_0: {
        'controlled-terms': ruleFactory,
      },
      oas3_1: {
        'controlled-terms': ruleFactory,
      },
      oas3_2: {
        'controlled-terms': ruleFactory,
      },
    },
  };
}
