# Basic Authentication

Every request requires an `Authorization` header in the following format:

```plain
Authorization: Basic Base64(api_key:api_secret)
```

Where the header consists of the `Basic` keyword followed by your Basic Authentication `api_key` and `api_secret` (supplied by Sinch support), separated by a colon (`:`) and then Base64-encoded.

## Example request with Basic Authentication

```plain
POST /v1/messages HTTP/1.1
Host: eu.app.api.sinch.com
Accept: application/json
Content-Type: application/json
Authorization: Basic dGhpc2lzYWtleTp0aGlzaXNhc2VjcmV0Zm9ybW1iYXNpY2F1dGhyZXN0YXBp

{
  "messages": [
    {
      "content": "Hello World",
      "destination_number": "+61491570156",
      "format": "SMS"
    }
  ]
}
```

_Note: spaces are used as indentation in the body of the above request._

## Related

- [HMAC Authentication](hmac-authentication.md) — an alternative to Basic Auth using a request signature.
- [Sub-accounts](sub-accounts.md) — send on behalf of a sub-account using a parent account's credentials.

[← All guides](index.md)
