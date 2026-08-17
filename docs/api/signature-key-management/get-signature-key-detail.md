# Get signature key detail

Retrieve one signature key by its `key_id`.

| | |
|---|---|
| **Service** | [Signature Key Management](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/iam/signature_keys/{key_id}` |
| **Operation ID** | `GetSignatureKeyDetail` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — The detail of signature key. |
| **Required** | Path parameter `key_id` |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key_id` | string | Yes | Unique identifier of the signature key. |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | The detail of signature key. | `Getsignaturekeydetailresponse` |
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
curl -X GET "https://eu.app.api.sinch.com/v1/iam/signature_keys/7ca628a8-08b0-4e42-aeb8-960b37049c31" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const keyId = "7ca628a8-08b0-4e42-aeb8-960b37049c31";
const response = await fetch(
  `https://eu.app.api.sinch.com/v1/iam/signature_keys/${keyId}`,
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

- **400 Bad Request**: Unexpected error in API call. See HTTP response body for details.
- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.
- **404 Not Found**: Unexpected error in API call. See HTTP response body for details. No entity matches the supplied `key_id`.

## Related endpoints

- [Get signature key list](get-signature-key-list.md)
- [Enable signature key](enable-signature-key.md)
- [Delete signature key](delete-signature-key.md)

## Specification details

Retrieve the current detail of a signature key using the key_id returned in the `create signature key` endpoint.

A successful request for the `get signature key detail` endpoint will return a response body as follows:

```javascript
{
    "key_id": "7ca628a8-08b0-4e42-aeb8-960b37049c31",
    "cipher": "RSA",
    "digest": "SHA224",
    "created": "2018-01-18T10:16:12.364Z",
    "enabled": false
}
```

*Note: If an invalid or non-existent key_id parameter is specified in the request, then an HTTP 404 Not Found response will be returned*

[← Signature Key Management](index.md)
