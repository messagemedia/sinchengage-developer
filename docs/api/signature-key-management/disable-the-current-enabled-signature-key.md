# Disable the current enabled signature key

Disable the currently enabled signature key. The operation also succeeds when no key is enabled.

| | |
|---|---|
| **Service** | [Signature Key Management](index.md) |
| **Method** | `DELETE` |
| **URL** | `https://eu.app.api.sinch.com/v1/iam/signature_keys/enabled` |
| **Operation ID** | `DisableTheCurrentEnabledSignatureKey` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `204` — No content. |
| **Required** | None (no path, query, header, or body parameters) |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

None.

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | No content. | — |
| 401 | No valid authentication details were provided | — |
| 403 | Unexpected error in API call. See HTTP response body for details. | `Disablethecurrentenabledsignaturekey.403response` |

### 403 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X DELETE "https://eu.app.api.sinch.com/v1/iam/signature_keys/enabled" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch(
  "https://eu.app.api.sinch.com/v1/iam/signature_keys/enabled",
  {
    method: "DELETE",
    headers: {
      "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
      "Accept": "application/json"
    }
  }
);

console.log(response.status);
```

## Error handling

- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.

## Related endpoints

- [Get enabled signature key](get-enabled-signature-key.md)
- [Enable signature key](enable-signature-key.md)
- [Delete signature key](delete-signature-key.md)

## Specification details

Disable the current enabled signature key.

A successful request for the `disable the current enabled signature key` endpoint will return no content when successful.

If there is an enabled key, it will be disabled; and the 204 status code is returned.

If there is no key or no enabled key, the 204 status code is also returned.

[← Signature Key Management](index.md)
