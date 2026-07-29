import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const WEB_DIR = path.join(root, 'web');
const OUT_DIR = path.join(root, 'web_deploy');

const ASSETS = [
  'favicon.png',
  'logo.png',
  'logo.svg',
  'message-flow.png',
];

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const name of ASSETS) {
  const src = path.join(WEB_DIR, name);
  const dest = path.join(OUT_DIR, name);
  if (!fs.existsSync(src)) {
    console.warn(`Asset not found, skipping: ${name}`);
    continue;
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied ${name} -> web_deploy/${name}`);
}

// Publish the injected OpenAPI document next to the HTML docs so ReDoc
// downloadUrls can serve YAML and JSON from GitHub Pages (includes x-codeSamples).
const injected = path.join(root, '.tmp', 'openapi.injected.yaml');
const openapiYamlOut = path.join(OUT_DIR, 'openapi.yaml');
const openapiJsonOut = path.join(OUT_DIR, 'openapi.json');
if (fs.existsSync(injected)) {
  const raw = fs.readFileSync(injected, 'utf8');
  fs.writeFileSync(openapiYamlOut, raw);
  console.log('Copied .tmp/openapi.injected.yaml -> web_deploy/openapi.yaml');
  const doc = yaml.load(raw);
  fs.writeFileSync(openapiJsonOut, `${JSON.stringify(doc, null, 2)}\n`);
  console.log('Wrote web_deploy/openapi.json');
} else {
  console.warn('Injected OpenAPI not found; run npm run inject before copy-assets');
}
