# Sub-accounts

## Performing actions on behalf of sub-accounts

Using API keys at the parent account level, you can perform actions on behalf of a sub-account.

This feature is supported by the Messages, Replies, Delivery Reports, and Webhooks APIs. Source Address also supports it, on all of its endpoints (see its own documentation).

To do this, include a header key `Account` with the sub-account ID as the value. For example:

```plain
Account: mySubAccount
```

## Example request sending from a sub-account

```plain
POST /v1/messages HTTP/1.1
Host: eu.app.api.sinch.com
Accept: application/json
Content-Type: application/json
Authorization: Basic dGhpc2lzYWtleTp0aGlzaXNhc2VjcmV0Zm9ybW1iYXNpY2F1dGhyZXN0YXBp
Account: SubAccount

{
  "messages": [
    {
      "content": "Hello World",
      "destination_number": "+61491570156",
      "delivery_report": true
    }
  ]
}
```

## Related

- [Basic Authentication](basic-authentication.md)
- [HMAC Authentication](hmac-authentication.md)

[← All guides](index.md)
