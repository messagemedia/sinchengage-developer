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

// Markdown image syntax, capturing the target of ![alt](target "optional title").
const IMAGE_REF = /!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g;

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

function localImageRefs(markdown) {
  const refs = new Set();
  for (const [, target] of markdown.matchAll(IMAGE_REF)) {
    const isRemote = /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('//');
    if (isRemote || target.startsWith('#') || target.startsWith('/')) {
      continue;
    }
    refs.add(target.split(/[?#]/)[0]);
  }
  return refs;
}

// A diagram referenced from a page description (e.g. ./message-flow.png) is
// resolved by ReDoc against the site root, where copy-assets.mjs publishes it
// from web/. The same relative target has to resolve next to the published
// Markdown too, so copy each referenced image into the page's output folder.
function copyReferencedImages(mdSource, mdDest) {
  let copied = 0;
  for (const ref of localImageRefs(fs.readFileSync(mdSource, 'utf8'))) {
    const dest = path.resolve(path.dirname(mdDest), ref);
    if (path.relative(OUT_DIR, dest).startsWith('..')) {
      console.warn(`Image target escapes web_deploy/, skipping: ${ref}`);
      continue;
    }
    const candidates = [
      path.resolve(path.dirname(mdSource), ref),
      path.join(WEB_DIR, path.basename(ref))
    ];
    const src = candidates.find((candidate) => fs.existsSync(candidate));
    if (!src) {
      console.warn(`Image not found for ${path.relative(root, mdSource)}, skipping: ${ref}`);
      continue;
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`Copied ${toPosix(path.relative(root, src))} -> web_deploy/${toPosix(path.relative(OUT_DIR, dest))}`);
    copied += 1;
  }
  return copied;
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join('/');
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
  let images = 0;
  for (const src of files) {
    const rel = path.relative(root, src); // e.g. docs/api/webhooks-management/create-webhook.md
    const dest = path.join(OUT_DIR, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    // Normalise to forward slashes for readable log output on Windows.
    console.log(`Copied ${toPosix(rel)} -> web_deploy/${toPosix(rel)}`);
    copied += 1;
    images += copyReferencedImages(src, dest);
  }

  console.log(`Published ${copied} Markdown file(s) and ${images} referenced image(s) into web_deploy/.`);

  copyWidgetAssets();
}

main();
