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
    mobile-landing-pages/
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
      mobile-landing-pages/
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

- `<lang>` — language folder name (for example `JavaScript`, `Python`, `C#`)
- `<path>` — API path with `/` replaced by `@`
- `<HTTP verb>` — HTTP method of the target operation (extension is ignored)

e.g.:
- `/spec/code_samples/JavaScript/v1@messages@{messageId}/get.js` → `GET /v1/messages/{messageId}`
- `/spec/code_samples/Python/v1@messages/post.py` → `POST /v1/messages`

At build time the pipeline first **bundles** the multi-file spec, then `scripts/inject-code-samples.mjs` walks the samples tree and attaches each file as an `x-codeSamples` entry on the matching operation. Source files under `/spec` are never mutated; intermediates are written under `/.tmp`.

See [`/spec/code_samples/README.md`](spec/code_samples/README.md) for the full convention.

### `/web`
Static assets and the Handlebars HTML template used by `redocly build-docs`.

| Path | Purpose |
|------|---------|
| `/web/index.html` | ReDoc HTML template (`{{{redocHead}}}` / `{{{redocHTML}}}`). |
| `/web/logo.png`, `/web/logo.svg` | Brand logo (`x-logo` in the spec points at `./logo.png`). |
| `/web/favicon.png` | Favicon linked from the template. |
| `/web/message-flow.png` | Image referenced from the API description. |

### `/scripts`
Build helpers used by npm scripts.

| Path | Purpose |
|------|---------|
| `/scripts/inject-code-samples.mjs` | Injects `/spec/code_samples/` into `x-codeSamples` on the bundled spec. |
| `/scripts/copy-assets.mjs` | Copies `/web` assets into `/web_deploy` and publishes `openapi.yaml` + `openapi.json` for ReDoc downloads. |

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
| `/web_deploy` | Static site output: `index.html` plus copied assets. Deployed by CI. |
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
Bundles the multi-file spec, injects code samples, builds static ReDoc HTML into `web_deploy`, and copies web assets (logo, favicon, etc.).

#### `npm run bundle`
Bundles the OpenAPI spec to `web_deploy/openapi.yaml`.

#### `npm test`
Alias for `npm run lint`.

### Manual preview check

After changing the spec layout or build pipeline, open the local preview (`npm run preview-docs`) or the Pages preview for the PR and confirm ReDoc looks the same as the published docs at https://docs.app.api.sinch.com/ (sidebar tags, operations, and code samples).
