# Delete assignment

Release a dedicated number from the authenticated account.

| | |
|---|---|
| **Service** | [Dedicated Numbers](index.md) |
| **Method** | `DELETE` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/{numberId}/assignment` |
| **Operation ID** | `DeleteAssignment` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `204` — No Content |
| **Required** | `numberId` path parameter and `Accept` header |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `numberId` | string | Yes | unique identifier |

### Query parameters

None.

### Header parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Accept` | string | Yes | Requested response media type. |

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | No Content | string (binary) |
| 401 | No valid authentication details were provided | None |
| 403 | Unexpected error in API call. See HTTP response body for details. | `403response` |

### 204 response schema

- **Content-Type:** `application/json;charset=UTF-8`
- **Type:** string
- **Format:** binary
- **Description:** No Content

### 403 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X DELETE "https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/b9ee3fe8-2c20-47b1-96e9-c5d12d7ed985/assignment" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json;charset=UTF-8"
```

### JavaScript (fetch)

```javascript
const numberId = "b9ee3fe8-2c20-47b1-96e9-c5d12d7ed985";
const response = await fetch(
  `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/${numberId}/assignment`,
  {
    method: "DELETE",
    headers: {
      "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
      "Accept": "application/json;charset=UTF-8"
    }
  }
);
console.log(response.status);
```

## Error handling

- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials on the request.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.

## Related endpoints

- [Get assignment](get-assignment.md)
- [Create assignment](create-assignment.md)
- [Get assigned numbers](get-assigned-numbers.md)

## Specification details

Release the dedicated number from your account.

[← Dedicated Numbers](index.md)
