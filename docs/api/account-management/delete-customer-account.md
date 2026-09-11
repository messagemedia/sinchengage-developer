# Delete customer account

Use this endpoint to delete the specified account.

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
| US instance | `https://us.app.api.sinch.com` |

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Account id to delete. Example: `MyTestAccount_ZQR_0001` |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description |
|--------|-------------|
| 204 | Account deleted successfully. No content |
| 401 | No valid authentication details were provided |
| 403 | Invalid credentials |
| 404 | Account not found |
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
