# Code samples

Request samples are injected as [`x-codeSamples`](https://github.com/Rebilly/ReDoc/blob/master/docs/redoc-vendor-extensions.md#x-code-samples) at build time by `scripts/inject-code-samples.mjs`.

**Policy:** only nonempty samples with the correct language extension are published. Empty placeholder files are not kept. Missing coverage is tracked in [`TODO.md`](./TODO.md) (85 operations × 6 languages; **481** gaps today) and fulfilled via follow-up tickets.

## Layout

Path: `<lang>/<path>/<HTTP verb>.<extension>` where:

| Part | Meaning |
|------|---------|
| `<lang>` | Language folder name (must match one of: `C#`, `Java`, `JavaScript`, `PHP`, `Python`, `Ruby`) |
| `<path>` | API path with `/` replaced by `@` |
| `<HTTP verb>` | HTTP method of the target operation |
| `<extension>` | **Must** match the language (see below). Empty files are rejected. |

Examples:

- `JavaScript/v1@messages@{messageId}/get.js` → `GET /v1/messages/{messageId}`
- `Python/v1@messages/post.py` → `POST /v1/messages`

## Required extensions

| Language folder | Allowed extensions |
|-----------------|--------------------|
| `C#` | `.cs` |
| `Java` | `.java` |
| `JavaScript` | `.js`, `.mjs`, `.cjs`, `.ts` |
| `PHP` | `.php` |
| `Python` | `.py` |
| `Ruby` | `.rb` |

`npm run inject` / `npm run build` fails if a sample has the wrong extension for its folder or is empty, so blank or mislabeled tabs cannot ship in the docs.

## Tracking gaps

See [`TODO.md`](./TODO.md) for the full operation × language matrix (what is present vs missing, grouped by tag).
