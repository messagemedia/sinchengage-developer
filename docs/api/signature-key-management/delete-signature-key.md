# Delete signature key

Delete one signature key by its `key_id`.

| | |
|---|---|
| **Service** | [Signature Key Management](index.md) |
| **Method** | `DELETE` |
| **URL** | `https://eu.app.api.sinch.com/v1/iam/signature_keys/{key_id}` |
| **Operation ID** | `DeleteSignatureKey` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — The signature key has been deleted. |
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
| 200 | The signature key has been deleted. | — |
| 401 | No valid authentication details were provided | — |
| 403 | Unexpected error in API call. See HTTP response body for details. | `Disablethecurrentenabledsignaturekey.403response` |
| 404 | Unexpected error in API call. See HTTP response body for details. | `Disablethecurrentenabledsignaturekey.403response` |

### 403 and 404 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X DELETE "https://eu.app.api.sinch.com/v1/iam/signature_keys/7ca628a8-08b0-4e42-aeb8-960b37049c31" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const keyId = "7ca628a8-08b0-4e42-aeb8-960b37049c31";
const response = await fetch(
  `https://eu.app.api.sinch.com/v1/iam/signature_keys/${keyId}`,
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
- **404 Not Found**: Unexpected error in API call. See HTTP response body for details. No entity matches the supplied `key_id`.

## Related endpoints

- [Get signature key detail](get-signature-key-detail.md)
- [Get signature key list](get-signature-key-list.md)
- [Disable the current enabled signature key](disable-the-current-enabled-signature-key.md)

## Specification details

Delete a signature key using the key_id returned in the `create signature key` endpoint.

A successful request for the `delete signature key` endpoint will return an empty response body.

*Note: If an invalid or non-existent key_id parameter is specified in the request, then an HTTP 404 Not Found response will be returned*

[← Signature Key Management](index.md)
