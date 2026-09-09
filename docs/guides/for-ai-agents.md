# For AI Agents

How to point an AI assistant, coding agent, or crawler at the Sinch Engage API documentation
so it gets accurate, current answers instead of guessing.

Everything below is published on every docs build, so it never drifts from the reference you
are reading now. Nothing requires an API key — these are public URLs.

## What's published

| Artifact | URL | Use it for |
|----------|-----|-----------|
| Curated index | [`/llms.txt`](https://developers.app.sinch.com/llms.txt) | The starting point. A small (1,000–3,000 token) plain-text map of the API: authentication, every service, code samples, guides. Fetch this first. |
| Full documentation | [`/llms-full.txt`](https://developers.app.sinch.com/llms-full.txt) | Every reference and guide page inlined in one file, each behind a stable anchor. Use it when you want the whole corpus in context or as an uploaded file. |
| Per-page Markdown | `/docs/api/<service>/<operation>.md`<br>`/docs/guides/<guide>.md` | One clean Markdown file per operation — no HTML, no navigation chrome. Best for retrieving just the endpoint you're working on. |
| OpenAPI specification | [`/openapi.yaml`](https://developers.app.sinch.com/openapi.yaml) · [`/openapi.json`](https://developers.app.sinch.com/openapi.json) | Machine-readable request/response schemas, enums, and constraints. The authoritative contract when generating or validating code. |

Index pages list what exists: [`/docs/api/index.md`](https://developers.app.sinch.com/docs/api/index.md)
for the API reference and [`/docs/guides/index.md`](https://developers.app.sinch.com/docs/guides/index.md)
for guides.

**Example** — the Markdown for the send-messages endpoint:

```plain
https://developers.app.sinch.com/docs/api/messages/send-messages.md
```

## Discovery

If you build a crawler or agent, you don't need to hard-code the paths above. Every page of
the API reference declares them in its `<head>`:

```html
<link rel="describedby" href="https://developers.app.sinch.com/llms.txt" title="LLM site index">
<link rel="alternate" type="text/plain" href="https://developers.app.sinch.com/llms.txt" title="LLM site index">
<link rel="alternate" type="text/plain" href="https://developers.app.sinch.com/llms-full.txt" title="LLM full content index">
```

`rel="describedby"` is the discovery relation defined by llms.txt v2 and is the one to match
on. The two `rel="alternate"` tags carry the same targets and are kept for agents written
against the earlier convention.

The OpenAPI document points at the same index from its root `externalDocs`, so a tool that
starts from the specification can find the prose docs too:

```yaml
externalDocs:
  description: Agent-readable curated docs index (llms.txt)
  url: https://developers.app.sinch.com/llms.txt
```

## Point your tool at the docs

### Any agent or script

Fetch the curated index first, then follow only the links you need. This keeps context small
and avoids ingesting the whole corpus for a one-endpoint question:

```bash
curl -s https://developers.app.sinch.com/llms.txt
curl -s https://developers.app.sinch.com/docs/api/messages/send-messages.md
```

Use `/openapi.yaml` when you need exact schemas — field names, types, enums, and limits — for
code generation or request validation.

### Claude Code

Ask it to read the index, and it will follow the links from there:

```plain
Read https://developers.app.sinch.com/llms.txt, then show me how to send an
SMS with a delivery report using Basic Authentication.
```

To make it available in every session of a project, add a line to your `CLAUDE.md`:

```markdown
Sinch Engage API docs: https://developers.app.sinch.com/llms.txt (start here),
full corpus at /llms-full.txt, OpenAPI at /openapi.yaml.
```

### Cursor

Add the docs once, then reference them with `@Docs`:

1. **Settings → Indexing & Docs → Add Doc**
2. Enter `https://developers.app.sinch.com/llms-full.txt`
3. Name it `Sinch Engage`, then use `@Docs Sinch Engage` in chat or Composer.

### ChatGPT

Paste the index URL in the conversation and let it browse:

```plain
Using https://developers.app.sinch.com/llms.txt as the source of truth,
write a Node.js function that polls for replies.
```

For a Project or a custom GPT that should always have the docs on hand, download
`llms-full.txt` and upload it as a knowledge file instead.

### Perplexity

Include the URL in the question so the answer is grounded in the docs rather than the open
web:

```plain
https://developers.app.sinch.com/llms-full.txt — what are the required headers
for HMAC authentication on this API?
```

### Other tools

Anything that accepts a documentation URL or an uploaded text file works: point it at
`/llms.txt` for a map, or `/llms-full.txt` for the complete text.

## On-page actions

Each section of the API reference has two links next to its heading:

- **Copy for LLM** — copies that section as Markdown to your clipboard, ready to paste into a
  chat.
- **View as Markdown** — opens that section's raw `.md` file, so you can copy the URL for an
  agent to fetch.

## Versioning

The Sinch Engage API's supported surface is `/v1/`, so the published artifacts are the root
ones listed above — there is a single `/llms.txt`, and it always describes the current stable
version.

A handful of Messaging Reports endpoints are pre-release under `/v2-preview/`. They appear in
the reference and are marked as preview, but they do not get their own index while their
contract can still change. When a new major version is promoted out of preview it will be
published as a version-scoped variant (for example `/v2/llms.txt`), and the root `/llms.txt`
will continue to track the current stable version.

Regeneration happens on every documentation publish, so a cached copy of any artifact can go
stale. Re-fetch rather than relying on a stored snapshot, and treat `/openapi.yaml` as the
authoritative contract if a prose page and the specification ever disagree.

## Related

- [Basic Authentication](basic-authentication.md) — the simplest way to authenticate the
  requests your agent generates.
- [HMAC Authentication](hmac-authentication.md) — request signing, if you need it.
- [Sub-accounts](sub-accounts.md) — acting on behalf of a sub-account.

[← All guides](index.md)
