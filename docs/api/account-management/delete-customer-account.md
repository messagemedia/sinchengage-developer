# Delete a sub-account

Permanently deletes the sub-account named in `{id}`. This does **not** delete your own (parent) account. `{id}` must be a sub-account you manage. This cannot be undone.

- Sinch Engage users on that sub-account will no longer be able to use it.
- The sub-account can no longer send or receive messages.
- Any sub-accounts nested under it are also deleted.

A successful delete returns **204** with an empty body. If the account does not exist or you cannot manage it, the API returns **404**.

| | |
|---|---|
| **Service** | [Account Management](index.md) |
| **Method** | `DELETE` |
| **URL** | `https://eu.app.api.sinch.com/v1/iam/accounts/{id}` |
| **Operation ID** | `DeleteCustomerAccount` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports two authentication methods:

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com` |
| APAC instance | `https://au.app.api.sinch.com` |

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | The sub-account to delete. Must be a sub-account you manage. Example: `MyTestAccount_ZQR_0001` |

### Query parameters

None.

### Header parameters

None.

## Responses

| Status | Description |
|--------|-------------|
| 204 | The sub-account was deleted. Empty body. |
| 401 | The request was not authenticated. Check your API key (or username and password). |
| 404 | The account in `{id}` does not exist, or you do not have permission to delete it. Both cases return 404 so callers cannot tell them apart. |
| 500 | Server error |

### 204 response

No response body is returned on successful deletion.

## Examples

### cURL

```bash
curl -X DELETE "https://eu.app.api.sinch.com/v1/iam/accounts/MyTestAccount_ZQR_0001" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS"
```

[← Account Management](index.md)
