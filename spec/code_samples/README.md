# Code samples

Request samples are injected as [`x-codeSamples`](https://github.com/Rebilly/ReDoc/blob/master/docs/redoc-vendor-extensions.md#x-code-samples) at build time by `scripts/inject-code-samples.mjs`.

**Policy:** only nonempty samples with the correct language extension are published. Empty placeholder files are not kept.

**Style:** pure-language HTTP samples (no MessageMedia/Sinch SDKs). Prefer language stdlib or the most common HTTP client. Use Basic Auth with placeholders `YOUR_API_KEY` / `YOUR_API_SECRET` / `YOUR_API_HOST` (set the host from the regional servers listed in the main docs). HMAC is mentioned only as a one-line availability comment.

## Layout

Path: `<lang>/<path>/<HTTP verb>.<extension>` where:

| Part | Meaning |
|------|---------|
| `<lang>` | Language folder name (must match one of: `curl`, `C#`, `Java`, `JavaScript`, `PHP`, `Python`, `Ruby`) |
| `<path>` | API path with `/` replaced by `@` |
| `<HTTP verb>` | HTTP method of the target operation |
| `<extension>` | **Must** match the language (see below). Empty files are rejected. |

Examples:

- `curl/v1@messages/post.sh` → `POST /v1/messages`
- `JavaScript/v1@messages@{messageId}/get.js` → `GET /v1/messages/{messageId}`
- `Python/v1@webhooks@messages/get.py` → `GET /v1/webhooks/messages`

## Required extensions

| Language folder | Allowed extensions |
|-----------------|--------------------|
| `curl` | `.sh` |
| `C#` | `.cs` |
| `Java` | `.java` |
| `JavaScript` | `.js`, `.mjs`, `.cjs`, `.ts` |
| `PHP` | `.php` |
| `Python` | `.py` |
| `Ruby` | `.rb` |

`npm run inject` / `npm run build` fails if a sample has the wrong extension for its folder or is empty, so blank or mislabeled tabs cannot ship in the docs.
