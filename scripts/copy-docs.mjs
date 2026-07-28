import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Source Markdown lives under /docs and is mirrored into /web_deploy so the
// published ReDoc site can serve raw Markdown for the "Copy for LLM" and
// "View as Markdown" page actions (see web/index.html and the README).
const DOCS_DIR = path.join(root, 'docs');
const WEB_DIR = path.join(root, 'web');
const OUT_DIR = path.join(root, 'web_deploy');

// Front-end assets for the page-actions widget that aren't part of the fixed
// copy-assets.mjs list. Published alongside index.html.
const WIDGET_ASSETS = ['llm-actions.js'];

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

function copyWidgetAssets() {
  for (const name of WIDGET_ASSETS) {
    const src = path.join(WEB_DIR, name);
    if (!fs.existsSync(src)) {
      console.warn(`Widget asset not found, skipping: ${name}`);
      continue;
    }
    fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.copyFileSync(src, path.join(OUT_DIR, name));
    console.log(`Copied web/${name} -> web_deploy/${name}`);
  }
}

function main() {
  const files = walkMarkdown(DOCS_DIR);

  if (files.length === 0) {
    console.warn(`No Markdown found under ${path.relative(root, DOCS_DIR)}; nothing to publish.`);
    // web/index.html always loads the widget script, so publish it regardless
    // of whether any Markdown pages were found.
    copyWidgetAssets();
    return;
  }

  let copied = 0;
  for (const src of files) {
    const rel = path.relative(root, src); // e.g. docs/api/webhooks-management/create-webhook.md
    const dest = path.join(OUT_DIR, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    // Normalise to forward slashes for readable log output on Windows.
    console.log(`Copied ${rel.split(path.sep).join('/')} -> web_deploy/${rel.split(path.sep).join('/')}`);
    copied += 1;
  }

  console.log(`Published ${copied} Markdown file(s) into web_deploy/.`);

  copyWidgetAssets();
}

main();
