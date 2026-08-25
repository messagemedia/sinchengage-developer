import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { encode } from 'gpt-tokenizer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Generates web_deploy/llms.txt (curated index) and web_deploy/llms-full.txt
// (full inlined Markdown) from canonical sources on every docs publish (MAPI-2256).
//
// Sources:
//   - spec/openapi.yaml       -> title + 1-2 sentence summary for the H1/blockquote
//   - docs/llms-curation.yaml -> hand-maintained curated links (llms.txt) + deny
//                                globs (llms-full.txt)
//   - docs/api/**, docs/guides/** -> canonical per-page Markdown (already
//                                published by scripts/copy-docs.mjs)
//
// There is currently only one *supported* (non-preview) API major version --
// almost all paths are /v1/..., aside from a handful of /v2-preview/...
// Messaging Reports endpoints that are explicitly pre-release and don't get
// their own llms.txt variant -- so only a root llms.txt/llms-full.txt is
// published. To add a versioned variant once a v2 is promoted out of
// preview, write the same output under web_deploy/v2/ with a version-scoped
// curation file/spec and keep the root files pointing at the current stable
// version.

// Matches web/index.html's discovery tags and README.md. Both output files
// use fully-qualified links (not root-relative) because they're designed to
// be fetched or copy-pasted standalone -- a relative path is meaningless once
// it leaves the page that gave it a base URL (e.g. via the "Copy for LLM"
// button, or an agent that ingests the raw text without HTTP context).
const DOCS_DOMAIN = 'https://docs.app.api.sinch.com';

const SPEC_PATH = path.join(root, 'spec', 'openapi.yaml');
const CURATION_PATH = path.join(root, 'docs', 'llms-curation.yaml');
const OUT_DIR = path.join(root, 'web_deploy');
const OUT_LLMS = path.join(OUT_DIR, 'llms.txt');
const OUT_LLMS_FULL = path.join(OUT_DIR, 'llms-full.txt');

const FULL_CONTENT_DIRS = ['docs/api', 'docs/guides'];
const REQUIRED_SECTIONS = ['Authentication', 'Endpoints', 'Code Samples', 'Guides'];
const MIN_TOKENS = 1000;
const MAX_TOKENS = 3000;

function estimateTokens(text) {
  // Real cl100k_base tokenization (gpt-tokenizer), not a chars/4 guess: a
  // chars/4 heuristic measured ~18% high against this actual content (1058
  // vs. 896 real tokens) -- close enough to the 1,000 floor to flip a real
  // budget miss into a false "pass". This is a hard CI gate, so it earns a
  // real tokenizer instead of a fudge factor.
  return encode(text).length;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  const pattern = escaped.replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]*').replaceAll('\u0000', '.*');
  return new RegExp(`^${pattern}$`);
}

function isDenied(relPath, denyPatterns) {
  return denyPatterns.some((pattern) => globToRegExp(pattern).test(relPath));
}

function summarize(description, maxParagraphs = 2) {
  // Strip Markdown heading *lines* (not whole paragraphs -- a folded YAML
  // scalar can join a heading and the following prose with a single '\n',
  // so dropping the entire paragraph would lose real summary text).
  const withoutHeadings = description.replace(/^#{1,6}[ \t].*$/gm, '');
  const paragraphs = withoutHeadings
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return paragraphs.slice(0, maxParagraphs).join(' ');
}

function resolveLinkUrl(linkPath, errors) {
  if (/^https?:\/\//i.test(linkPath)) {
    return linkPath;
  }
  const abs = path.join(root, linkPath);
  if (!fs.existsSync(abs)) {
    errors.push(`Curated link points at a missing file: ${linkPath}`);
  }
  return `${DOCS_DOMAIN}/${linkPath}`;
}

// Matches Markdown links and images: [text](target) / ![alt](target), with
// an optional "title" after the target. Deliberately simple (no code-fence
// awareness) -- none of the published docs put literal "](" inside a fenced
// code sample, and re-parsing Markdown properly is out of proportion here.
const MARKDOWN_LINK = /(!?\[[^\]]*\]\()([^)\s]+)(\s+"[^"]*")?(\))/g;

// docs/**/*.md is full of page-relative links ("send-messages.md",
// "../index.md") and image refs ("./message-flow.png") that only resolve
// correctly next to their own file. Once a page is inlined into the single
// flat llms-full.txt, that relative context is gone, so every such link/image
// must be rewritten to a fully-qualified URL anchored to the *source* page's
// directory -- otherwise a large fraction of llms-full.txt's links would be
// silently broken for any AI agent that follows them.
function absolutizeLinks(markdown, fileRelPath) {
  const fileDir = path.posix.dirname(fileRelPath);
  return markdown.replace(MARKDOWN_LINK, (match, prefix, target, title = '', suffix) => {
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('//') || target.startsWith('#')) {
      return match; // already absolute (any scheme) or a same-page fragment
    }
    const hashIndex = target.indexOf('#');
    const pathPart = hashIndex === -1 ? target : target.slice(0, hashIndex);
    const fragment = hashIndex === -1 ? '' : target.slice(hashIndex);
    const resolved = pathPart.startsWith('/')
      ? pathPart.slice(1)
      : path.posix.normalize(path.posix.join(fileDir, pathPart));
    return `${prefix}${DOCS_DOMAIN}/${resolved}${fragment}${title}${suffix}`;
  });
}

function walkMarkdown(dir) {
  const results = [];
  if (!fs.existsSync(dir)) {
    return results;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkMarkdown(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function buildLlmsTxt(spec, curation, errors) {
  const title = spec.info?.title || 'API Reference';
  const summary = summarize(spec.info?.description || '');

  const sectionTitles = (curation.sections || []).map((s) => s.title);
  for (const required of REQUIRED_SECTIONS) {
    if (!sectionTitles.some((t) => t?.toLowerCase() === required.toLowerCase())) {
      errors.push(`Required llms.txt section missing from docs/llms-curation.yaml: "${required}"`);
    }
  }

  const lines = [`# ${title}`, '', `> ${summary}`, ''];

  for (const section of curation.sections || []) {
    lines.push(`<a id="${slugify(section.title)}"></a>`);
    lines.push(`## ${section.title}`);
    lines.push('');
    if (section.note) {
      lines.push(section.note.trim());
      lines.push('');
    }
    for (const link of section.links || []) {
      const url = resolveLinkUrl(link.path, errors);
      const suffix = link.description ? `: ${link.description}` : '';
      lines.push(`- [${link.title}](${url})${suffix}`);
    }
    if (section.links?.length) {
      lines.push('');
    }
  }

  return lines.join('\n').trimEnd() + '\n';
}

function buildLlmsFullTxt(spec, curation) {
  const title = spec.info?.title || 'API Reference';
  const denyPatterns = curation.deny || [];

  const files = FULL_CONTENT_DIRS.flatMap((dir) => walkMarkdown(path.join(root, dir)))
    .map((abs) => ({ abs, rel: path.relative(root, abs).split(path.sep).join('/') }))
    .filter(({ rel }) => !isDenied(rel, denyPatterns))
    .sort((a, b) => a.rel.localeCompare(b.rel));

  const lines = [
    `# ${title} — Full Reference`,
    '',
    '> Complete Markdown content of every production-relevant documentation page, inlined for single-fetch AI consumption. Auto-generated on every docs publish.',
    '',
  ];

  for (const { abs, rel } of files) {
    const content = absolutizeLinks(fs.readFileSync(abs, 'utf8'), rel);
    lines.push(`<a id="${slugify(rel)}"></a>`);
    lines.push(`### Source: ${rel}`);
    lines.push('');
    lines.push(content.trimEnd());
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  return { text: lines.join('\n').trimEnd() + '\n', pageCount: files.length };
}

function main() {
  const errors = [];

  const spec = yaml.load(fs.readFileSync(SPEC_PATH, 'utf8'));
  const curation = yaml.load(fs.readFileSync(CURATION_PATH, 'utf8')) || {};

  const llmsTxt = buildLlmsTxt(spec, curation, errors);
  const { text: llmsFullTxt, pageCount } = buildLlmsFullTxt(spec, curation);

  const tokens = estimateTokens(llmsTxt);
  if (tokens < MIN_TOKENS || tokens > MAX_TOKENS) {
    errors.push(
      `llms.txt is ~${tokens} estimated tokens; outside the ${MIN_TOKENS}-${MAX_TOKENS} budget. Trim or expand docs/llms-curation.yaml sections.`,
    );
  }
  if (pageCount === 0) {
    errors.push('llms-full.txt would be empty; check docs/api and docs/guides are present and not fully denied.');
  }

  if (errors.length > 0) {
    console.error('llms.txt generation failed:');
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exitCode = 1;
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_LLMS, llmsTxt, 'utf8');
  fs.writeFileSync(OUT_LLMS_FULL, llmsFullTxt, 'utf8');

  console.log(
    `Wrote web_deploy/llms.txt (~${tokens} estimated tokens) and web_deploy/llms-full.txt (${pageCount} page(s) inlined).`,
  );
}

main();
