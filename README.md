# Sinch Engage OpenAPI Specification

## Overview

This repository holds the OpenAPI description and hosted API reference for the Sinch Engage API.

The source of truth is a **multi-file OpenAPI** tree under `/spec`. Edit path and component files directly; CI and local builds bundle them, inject code samples, and publish static ReDoc documentation to GitHub Pages.

## Repository Structure

### `/spec`
OpenAPI specification for Sinch Engage (split across an entry file, paths, and components).

| Path | Purpose |
|------|---------|
| `/spec/openapi.yaml` | Entry document: `info`, `tags`, `servers`, path `$ref`s, and selected component `$ref`s. |
| `/spec/paths/` | One YAML file per API path (operations live here). |
| `/spec/components/` | Shared `schemas/`, `responses/`, and `headers/`. (`securitySchemes` stay inline in `openapi.yaml`.) |
| `/spec/code_samples/` | Per-language request samples, mapped onto operations at build time. |
| `/spec/README.md` | Notes about the spec layout. |

Example layout:

```text
spec/
  openapi.yaml
  paths/
    contacts/
    messages/
    delivery-reports/
    replies/
    source-address/
    dedicated-numbers/
    number-authorisation/
    webhooks/
    signature-keys/
    short-trackable-links-reports/
    messaging-reports/
  components/
    schemas/
      contacts/
      messages/
      delivery-reports/
      replies/
      source-address/
      dedicated-numbers/
      number-authorisation/
      webhooks/
      signature-keys/
      short-trackable-links-reports/
      messaging-reports/
      _format-schemas.yaml           # shared; case-safe Format/format
      Number.yaml                    # shared across tags
      ...                            # other shared schemas stay at this level
    responses/
    headers/
  code_samples/
    JavaScript/v1@messages/post.js
```

**How to edit:** change the relevant file under `spec/paths/` or `spec/components/`. Do not hand-edit a bundled single-file copy. Lint/build resolve `$ref`s and produce the published docs.

#### Code samples

Samples follow the folder convention `<lang>/<path>/<HTTP verb>.<extension>` under `/spec/code_samples/`, where:

- `<lang>` — one of `curl`, `C#`, `Java`, `JavaScript`, `PHP`, `Python`, `Ruby`
- `<path>` — API path with `/` replaced by `@`
- `<HTTP verb>` — HTTP method of the target operation (extension must match the language)

e.g.:
- `/spec/code_samples/curl/v1@messages/post.sh` → `POST /v1/messages`
- `/spec/code_samples/JavaScript/v1@messages@{messageId}/get.js` → `GET /v1/messages/{messageId}`
- `/spec/code_samples/Python/v1@messages/post.py` → `POST /v1/messages`

At build time the pipeline first **bundles** the multi-file spec, then `scripts/inject-code-samples.mjs` walks the samples tree and attaches each file as an `x-codeSamples` entry on the matching operation. Source files under `/spec` are never mutated; intermediates are written under `/.tmp`.

Samples are pure-language HTTP (no MessageMedia/Sinch SDKs). After bundling, regenerate with `node scripts/generate-code-samples.mjs`.

See [`/spec/code_samples/README.md`](spec/code_samples/README.md) for the full convention.

To smoke-test that samples execute against a real host (matrix or all ops), see [`/local/sample-smoke/README.md`](local/sample-smoke/README.md).

### `/web`
Static assets and the Handlebars HTML template used by `redocly build-docs`.

| Path | Purpose |
|------|---------|
| `/web/index.html` | ReDoc HTML template (`{{{redocHead}}}` / `{{{redocHTML}}}`). Loads the page-actions widget styles (inline) and `llm-actions.js`. |
| `/web/llm-actions.js` | "Copy for LLM / View as Markdown" page-actions widget script (see below). |
| `/web/logo.png`, `/web/logo.svg` | Brand logo (`x-logo` in the spec points at `./logo.png`). |
| `/web/favicon.png` | Favicon linked from the template. |
| `/web/message-flow.png` | Image referenced from the API description. |

### `/docs`
Human- and LLM-readable Markdown mirror of the API reference. `scripts/copy-docs.mjs`
publishes this tree into `web_deploy/docs/` at build time so the page-actions widget can
serve raw Markdown.

| Path | Purpose |
|------|---------|
| `/docs/api/index.md` | Top-level "all services" index. |
| `/docs/api/webhooks-management/index.md` | Webhooks Management service overview. |
| `/docs/api/webhooks-management/*.md` | One page per operation (create / retrieve / update / delete). |
| `/docs/guides/*.md` | Cross-cutting guides (Basic Authentication, HMAC Authentication, Sub-accounts) that aren't tied to a single endpoint. |
| `/docs/llms-curation.yaml` | Hand-maintained allow list (curated `llms.txt` links) and deny list (globs excluded from `llms-full.txt`) — see below. |

#### `llms.txt` / `llms-full.txt` generation

`scripts/generate-llms-txt.mjs` runs at the end of `npm run build` and writes two files straight into `web_deploy/`:

- **`llms.txt`** — a curated, token-budgeted (1k–3k) index: H1 (API title) → blockquote summary (from `spec/openapi.yaml` `info.description`) → H2 sections (Authentication, Endpoints, Code Samples, Guides) driven entirely by `docs/llms-curation.yaml`.
- **`llms-full.txt`** — every page under `/docs/api` and `/docs/guides` (minus `docs/llms-curation.yaml`'s `deny` globs, e.g. `docs/superpowers/**`) inlined in full, each behind a stable `<a id="...">` anchor.

The script fails the build (non-zero exit) if a curated link points at a missing file, a required section is missing, or `llms.txt` falls outside the token budget — so a bad edit to the curation file or the docs tree can't silently ship. There's currently only one *supported* (non-preview) API major version — almost everything is `/v1/...`, aside from a handful of `/v2-preview/...` Messaging Reports endpoints that don't warrant their own variant while still pre-release — so only the root files are published; a `/v2/` variant is a small addition to the script once a version is promoted out of preview.

#### "Copy for LLM / View as Markdown" page actions

ReDoc Community Edition (`@redocly/cli` + `redocly build-docs`) has **no** built-in page
actions — `navigation.actions` in `redocly.yaml` is a Redocly Realm/Reunite feature and does
nothing here. Instead, a small dependency-free widget lives in `web/llm-actions.js` (loaded
by `web/index.html`; its styles stay inline in the template):

- Two simple text links are added inline with each section's heading, on the light
  description panel (they scroll with the content — they are **not** a floating overlay):
  - **Copy for LLM** copies the current section as Markdown to the clipboard.
  - **View as Markdown** opens the raw `.md` in a new tab (external-link icon).
- The widget reads each section's ReDoc `data-section-id` (`operation/<operationId>` or
  `tag/<Tag-Name>`), maps it to the matching file under `docs/api/…`, and resolves the URL
  against the site root, so it works both locally (`npm run preview-docs`) and on GitHub
  Pages. The links are anchored to the heading's panel and vertically centred on the heading.
  A `MutationObserver` re-runs injection after ReDoc hydrates (guarded so bars are never
  duplicated).
- Markdown is fetched at click time. If the fetch fails (offline, `file://`, missing file),
  Copy falls back to a short Markdown summary with the page title and URL.

**Where Markdown is served from:** `scripts/copy-docs.mjs` mirrors `/docs/**/*.md` into
`web_deploy/docs/**` during `npm run build` (and copies `web/llm-actions.js` into
`web_deploy/`), so the published site serves, for example,
`https://developers.app.sinch.com/docs/api/webhooks-management/create-webhook.md`.
Images a page references with a relative path (such as `./message-flow.png`, which ReDoc
resolves at the site root) are copied next to the published Markdown, so the same link
works in both places.

To add coverage for more sections, add the Markdown under `docs/api/…` and register the
`operationId` (or tag slug) in the `OP_TO_MD` / `TAG_TO_MD` maps in `web/llm-actions.js`.

### `/scripts`
Build helpers used by npm scripts.

| Path | Purpose |
|------|---------|
| `/scripts/inject-code-samples.mjs` | Injects `/spec/code_samples/` into `x-codeSamples` on the bundled spec. |
| `/scripts/generate-code-samples.mjs` | Regenerates pure-language samples for all operations × languages from the bundled OpenAPI. |
| `/scripts/copy-assets.mjs` | Copies `/web` assets into `/web_deploy` and publishes `openapi.yaml` + `openapi.json` for ReDoc downloads. |
| `/scripts/copy-docs.mjs` | Mirrors `/docs/**/*.md` (plus images each page references) into `/web_deploy/docs/` and copies `web/llm-actions.js`, so the site can serve raw Markdown and the page-actions widget. |
| `/scripts/generate-llms-txt.mjs` | Generates `/web_deploy/llms.txt` and `/web_deploy/llms-full.txt` from `spec/openapi.yaml` + `docs/llms-curation.yaml` + `/docs/api`, `/docs/guides`. |

### `/changelog`
Changelog entries for documentation or API updates.

e.g.:
- `/changelog/2026-06-16-MAPI-2218.md`

### `/.github`
CI workflows. The main workflow installs dependencies, lints the OpenAPI entry (resolving `$ref`s), builds static docs into `/web_deploy`, and deploys that folder to GitHub Pages.

### Root config

| Path | Purpose |
|------|---------|
| `redocly.yaml` | Redocly CLI config: API root (`spec/openapi.yaml`), lint ruleset/extends, custom plugins, and ReDoc theme. |
| `vocabulary.yaml` | Controlled vocabulary (banned terms + preferred replacements) enforced by `plugins/vocabulary.mjs`. |
| `package.json` | Dependencies and npm scripts (`lint`, `build`, `preview-docs`, and so on). |

### Generated output (not committed)

| Path | Purpose |
|------|---------|
| `/web_deploy` | Static site output: `index.html`, `llms.txt`, `llms-full.txt`, plus copied assets. Deployed by CI. |
| `/.tmp` | Intermediate files: `openapi.bundled.yaml` (resolved `$ref`s) and `openapi.injected.yaml` (bundle + code samples). |

## Working on specification

### Install

1. Install [Node JS](https://nodejs.org/)
2. Clone repo and run `npm install` in the repo root

### Usage

#### `npm run lint`
Validates the OpenAPI spec with Redocly lint rules (follows `$ref`s across the split files).

#### `npm run preview-docs`
Builds the static docs (bundle → inject code samples → ReDoc) and serves `web_deploy` at http://localhost:8080 so you can preview the same output CI deploys.

#### `npm run build`
Bundles the multi-file spec, injects code samples, builds static ReDoc HTML into `web_deploy`, copies web assets (logo, favicon, etc.), mirrors the `/docs` Markdown into `web_deploy/docs/` (via `scripts/copy-docs.mjs`) for the page-actions widget, and generates `web_deploy/llms.txt` + `web_deploy/llms-full.txt` (via `scripts/generate-llms-txt.mjs`).

#### `npm run llms`
Regenerates just `web_deploy/llms.txt` and `web_deploy/llms-full.txt` from the current `spec/openapi.yaml`, `docs/llms-curation.yaml`, `/docs/api`, and `/docs/guides` — useful when iterating on curation without a full rebuild.

#### `npm run bundle`
Bundles the OpenAPI spec to `web_deploy/openapi.yaml`.

#### `npm test`
Alias for `npm run lint`.

### Manual preview check

After changing the spec layout or build pipeline, open the local preview (`npm run preview-docs`) or the Pages preview for the PR and confirm ReDoc looks the same as the published docs at https://developers.app.sinch.com/ (sidebar tags, operations, and code samples).
