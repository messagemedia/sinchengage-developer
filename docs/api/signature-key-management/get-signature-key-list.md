# Get signature key list

Retrieve a page of signature keys for the authenticated account.

| | |
|---|---|
| **Service** | [Signature Key Management](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/iam/signature_keys` |
| **Operation ID** | `GetSignatureKeyList` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — The list of signature keys. |
| **Required** | Query parameters `page` and `page_size` |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

None.

### Query parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page` | string | Yes | Page number for pagination (1-based). |
| `page_size` | string | Yes | Number of results per page. |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | The list of signature keys. | array of `Getsignaturekeylistresponse` |
| 400 | Unexpected error in API call. See HTTP response body for details. | `Enablesignaturekey400response` |
| 401 | No valid authentication details were provided | — |
| 403 | Unexpected error in API call. See HTTP response body for details. | `Disablethecurrentenabledsignaturekey.403response` |

### 200 response schema

The response is an array whose items have this schema:

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

### 403 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/iam/signature_keys?page=1&page_size=20" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch(
  "https://eu.app.api.sinch.com/v1/iam/signature_keys?page=1&page_size=20",
  {
    method: "GET",
    headers: {
      "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
      "Accept": "application/json"
    }
  }
);

const keys = await response.json();
console.log(keys);
```

## Error handling

- **400 Bad Request**: Unexpected error in API call. See HTTP response body for details. The `details` array contains additional error detail messages.
- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.

## Related endpoints

- [Create signature key](create-signature-key.md)
- [Get signature key detail](get-signature-key-detail.md)
- [Get enabled signature key](get-enabled-signature-key.md)

## Specification details

Retrieve the paginated list of signature keys.

A successful request for the `get signature key list` endpoint will return a response body as follows:

```javascript
[
  {
    "key_id": "7ca628a8-08b0-4e42-aeb8-960b37049c31",
    "cipher": "RSA",
    "digest": "SHA224",
    "created": "2018-01-18T10:16:12.364Z",
    "enabled": false
  }
]
```

[← Signature Key Management](index.md)
