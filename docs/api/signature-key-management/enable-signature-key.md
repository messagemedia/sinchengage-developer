# Enable signature key

Enable a signature key. Enabling a new key disables the previously enabled key.

| | |
|---|---|
| **Service** | [Signature Key Management](index.md) |
| **Method** | `PATCH` |
| **URL** | `https://eu.app.api.sinch.com/v1/iam/signature_keys/enabled` |
| **Operation ID** | `EnableSignatureKey` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — The enabled signature key. |
| **Required** | `Accept` header; JSON request body |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

None.

### Query parameters

None.

### Header parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Accept` | string | Yes | Requested response media type. |

## Request body

- **Content-Type:** `application/json`
- **Required:** true

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `key_id` | string | Yes | |

### Example request body

```json
{
  "key_id": "7ca628a8-08b0-4e42-aeb8-960b37049c31"
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | The enabled signature key. | `Enablesignaturekeyresponse` |
| 400 | Unexpected error in API call. See HTTP response body for details. | `Enablesignaturekey400response` |
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

### 400 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |
| `details` | array of strings | Yes | Additional error detail messages. |

### 403 and 404 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X PATCH "https://eu.app.api.sinch.com/v1/iam/signature_keys/enabled" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"key_id":"7ca628a8-08b0-4e42-aeb8-960b37049c31"}'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/iam/signature_keys/enabled", {
  method: "PATCH",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    key_id: "7ca628a8-08b0-4e42-aeb8-960b37049c31"
  })
});

const key = await response.json();
console.log(key);
```

## Error handling

- **400 Bad Request**: Unexpected error in API call. See HTTP response body for details. The `details` array contains additional error detail messages.
- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.
- **404 Not Found**: Unexpected error in API call. See HTTP response body for details. No entity matches the supplied `key_id`.

## Related endpoints

- [Create signature key](create-signature-key.md)
- [Get enabled signature key](get-enabled-signature-key.md)
- [Disable the current enabled signature key](disable-the-current-enabled-signature-key.md)

## Specification details

Enable a signature key using the key_id returned in the `create signature key` endpoint.

There is only one signature key is enabled at the one moment in time. So if you enable the new signature key, the old one will be disabled.

The most basic body has the following structure:

```javascript
{
    "key_id": "7ca628a8-08b0-4e42-aeb8-960b37049c31"
}
```

The response body of a successful PATCH request to `enable signature key` endpoint will contain the `enabled` properties with the value is true as follows:

```javascript
{
    "key_id": "7ca628a8-08b0-4e42-aeb8-960b37049c31",
    "cipher": "RSA",
    "digest": "SHA224",
    "created": "2018-01-18T10:16:12.364Z",
    "enabled": true
}
```

*Note: If an invalid or non-existent key_id parameter is specified in the request, then an HTTP 404 Not Found response will be returned*

[← Signature Key Management](index.md)
