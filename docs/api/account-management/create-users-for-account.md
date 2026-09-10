# Create users for account

Create additional users in the web portal. New users receive an activation email to finish setting up their user profile. For existing users (matched by email address) this adds the user to the specified account and sends an invitation email the user must accept in order to use the account in the Hub.

| | |
|---|---|
| **Service** | [Account Management](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/iam/accounts/{id}/users` |
| **Operation ID** | `CreateUserForAccount` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports two authentication methods:

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Account id to create a user for. Example: `MyTestAccount_ZQR_0001` |

### Query parameters

None.

### Header parameters

None.

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Email address of the user to create or add. |

## Responses

| Status | Description |
|--------|-------------|
| 201 | User created or added to the account |
| 204 | No content |
| 400 | Request parameter is invalid |
| 401 | No valid authentication details were provided |
| 404 | Not found |
| 500 | Server error |

### 201 response

```json
{
  "email": "first.last@email.com"
}
```

## Examples

### cURL

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/iam/accounts/MyTestAccount_ZQR_0001/users" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"email":"first.last@email.com"}'
```

[← Account Management](index.md)
