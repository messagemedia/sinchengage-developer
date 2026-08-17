# Get enabled signature key

Retrieve the signature key that is currently enabled.

| | |
|---|---|
| **Service** | [Signature Key Management](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/iam/signature_keys/enabled` |
| **Operation ID** | `GetEnabledSignatureKey` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — The detail of signature key. |
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
| 200 | The detail of signature key. | `Getenabledsignaturekeyresponse` |
| 401 | No valid authentication details were provided | — |
| 403 | Unexpected error in API call. See HTTP response body for details. | `Disablethecurrentenabledsignaturekey.403response` |
| 404 | Unexpected error in API call. See HTTP response body for details. | `Disablethecurrentenabledsignaturekey.403response` |

### 200 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `key_id` | string | No | |
| `cipher` | string | No | |
| `digest` | string | No | |
| `created` | string | No | |
| `enabled` | boolean | No | |

### 403 and 404 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/iam/signature_keys/enabled" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch(
  "https://eu.app.api.sinch.com/v1/iam/signature_keys/enabled",
  {
    method: "GET",
    headers: {
      "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
      "Accept": "application/json"
    }
  }
);

const key = await response.json();
console.log(key);
```

## Error handling

- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.
- **404 Not Found**: Unexpected error in API call. See HTTP response body for details. The operation notes that this is returned when no signature key is enabled.

## Related endpoints

- [Enable signature key](enable-signature-key.md)
- [Disable the current enabled signature key](disable-the-current-enabled-signature-key.md)
- [Get signature key list](get-signature-key-list.md)

## Specification details

Retrieve the currently enabled signature key.

A successful request for the `get enabled signature key` endpoint will return a response body as follows:

```javascript
{
    "key_id": "7ca628a8-08b0-4e42-aeb8-960b37049c31",
    "cipher": "RSA",
    "digest": "SHA224",
    "created": "2018-01-18T10:16:12.364Z",
    "enabled": true
}
```

*Note: If there is no enabled signature key, then an HTTP 404 Not Found response will be returned*

[← Signature Key Management](index.md)
