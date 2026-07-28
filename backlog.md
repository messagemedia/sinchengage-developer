# API documentation backlog

Draft follow-up tickets for the Sinch Engage API documentation. Create them in Jira when ready.

---

## 1. Consolidate Engage error response schemas

| Field | Value |
|-------|-------|
| **Suggested type** | Story |
| **Suggested title** | Consolidate Engage OpenAPI error schemas onto one shared 4xx/5xx model |
| **Contract change** | **Yes** — coordinate with the owning API team before changing response shapes |

**Problem:** Multiple parallel error shapes (`ApiError`, `InvalidInputApiError`, tag-local errors) force clients and agents to special-case each surface.

**Scope:** Pick a canonical error schema; migrate path responses; document the catalog in `info.description` or a dedicated Errors guide. This is a **contract** change, not docs-only — the owning API team must agree the canonical shape and own any service-side alignment.

**AC:**
- One primary error schema (plus documented extensions if needed)
- Secured operations reference shared 4xx/5xx responses consistently
- Changelog notes any client-visible response shape changes

---

## 2. Standardize pagination across Engage APIs

| Field | Value |
|-------|-------|
| **Suggested type** | Story |
| **Suggested title** | Standardize OpenAPI pagination models across Engage list endpoints |
| **Contract change** | **Yes** — coordinate with the owning API team; converging patterns changes list responses |

**Problem:** Parallel pagination schemas (`Pagination`, `Paginate`, `Pagination1`, `PaginationMLP`, `PaginationNumberAuth`, Contacts page-token style) confuse codegen and agents.

**Scope:** Document current variants accurately first (docs-only); then, with the owning API team, converge list endpoints on one or two pagination patterns and update schemas/examples.

**AC:**
- Inventory of pagination styles linked from docs
- Target pattern agreed with the owning API team; migrated endpoints updated in OpenAPI
- Remaining exceptions explicitly documented

---

## 3. Model inbound webhooks / callbacks in OpenAPI

| Field | Value |
|-------|-------|
| **Suggested type** | Story |
| **Suggested title** | Add OpenAPI `webhooks`/`callbacks` for Engage delivery reports and inbound messages |
| **Contract change** | No — documents existing behaviour, but payload shapes must be validated with the owning API team |

**Problem:** Webhook payload contracts live mainly as prose; agents and codegen cannot discover inbound shapes from the OpenAPI document.

**Scope:** Add OpenAPI 3.x `webhooks` (and/or `callbacks` where applicable) for delivery reports, replies, and message webhook payloads. Keep `callback_url` request fields; the controlled vocabulary already treats those as exceptions. Validate every documented payload against production behaviour with the owning API team before publishing.

**AC:**
- Machine-readable webhook request bodies in the published OpenAPI
- Examples match production payload shapes (confirmed by the owning API team)
- ReDoc (or portal) surfaces the webhook section

---

## 4. Complete multi-language code samples

| Field | Value |
|-------|-------|
| **Suggested type** | Story |
| **Suggested title** | Fill missing Engage code samples (~481 gaps across 85 operations) |
| **Contract change** | No — docs-only |

**Problem:** Empty/wrong-language sample stubs were removed; the coverage matrix in `spec/code_samples/TODO.md` shows large gaps (Contacts, Messaging Reports, MLP, Source Address, and others).

**Scope:** Author real samples for C# / curl / Java / Node / PHP / Python per operation; keep the inject script rejecting empty files.

**AC:**
- `TODO.md` coverage matrix updated toward full 6-lang coverage for GA ops
- No blank or wrong-extension samples published
- Priority order: Messages → DRs/Replies → Webhooks → remaining tags

---

## 5. Try-it console for Engage API reference

| Field | Value |
|-------|-------|
| **Suggested type** | Story |
| **Suggested title** | Enable authenticated try-it against Engage docs portal |
| **Contract change** | No — portal/tooling only; no API behaviour changes |

**Problem:** ReDoc-only reference has no in-browser try-it; integrators leave the docs to experiment.

**Scope:** Portal upgrade (Redocly / Stoplight / custom) with try-it against EU/APAC servers; respect auth (Basic/HMAC) and never ship secrets in the static site.

**AC:**
- Try-it available for a defined set of GA endpoints
- Auth UX documented; no secrets in published artifacts
- Rate-limit / environment guidance visible in the console

---

## 6. Resolve trailing-slash path / server URLs (contract)

| Field | Value |
|-------|-------|
| **Suggested type** | Task |
| **Suggested title** | Decide and apply Engage trailing-slash URL contract for OpenAPI lint |
| **Contract change** | **Potentially** — changing URLs is a contract change; coordinate with the owning API team before deciding |

**Problem:** Four Redocly warnings remain (`no-server-trailing-slash`, `no-path-trailing-slash`) kept at `warn` so CI does not block. Path files use trailing `_` for slash URLs (see `spec/README.md`).

**Scope:** Decision with the owning API team: keep trailing slashes (document forever) or change URLs; then either ignore with justification or elevate rules to `error`.

**AC:**
- Written decision in changelog/docs
- Lint severity matches the decision
- Filename convention updated if paths change

---

## 7. Align OpenAPI schemas with production examples

| Field | Value |
|-------|-------|
| **Suggested type** | Story |
| **Suggested title** | Fix Engage OpenAPI schemas that disagree with production-accurate examples |
| **Contract change** | **Yes** — schema changes affect codegen and client expectations; coordinate with each owning API team |

**Problem:** Published examples reflect observed production behaviour, but many OpenAPI schemas disagree with them (~93 Redocly example warnings). Example lint rules (`no-invalid-schema-examples`, `no-invalid-media-type-examples`, `no-invalid-parameter-examples`) are held at `warn` so CI does not force incorrect example edits. 

**Recurring themes:**
- Phone numbers declared `string` vs numeric JSON examples
- `format: date-time` vs US-style date strings in examples
- `metadata` as object map vs array of single-key objects
- Pagination field names (`next_token` / `next_page_token` vs `page` / `total_count`) — overlaps item 2

**Scope:** Per area in the mismatch report, confirm wire format with the owning API team, then fix the **schema** (preferred). Only change an example if the owning team confirms it is stale. After clearance, re-elevate the three example rules to `error`.

**AC:**
- Each mismatch resolved (schema or confirmed example fix)
- Example lint rules restored to `error` with `npm run lint` clean for those rules
- Changelog notes any client-visible schema changes
