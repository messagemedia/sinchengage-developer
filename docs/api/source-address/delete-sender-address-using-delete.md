# Delete Sender Address

Remove an approved sender address from the account.

| | |
|---|---|
| **Service** | [Source Address](index.md) |
| **Method** | `DELETE` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/{id}` |
| **Operation ID** | `deleteSenderAddressUsingDELETE` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `202` — Accepted |
| **Required** | `id`, `reason` |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `id` | string (uuid) | Yes | Sender address UUID (from GET .../addresses), not the request UUID |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `reason` | string | Yes | A string detailing why the sender address is being removed |  |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 202 | Accepted | None |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | None |
| 403 | Forbidden | `403response` |
| 404 | Resource not found | `404response` |

### 400 response schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `message` | string | Yes |  |  |
| `details` | array of string | Yes | Additional error detail messages. |  |

### Example 400 response

```json
{
  "message": "Request failed to parse correctly. Please ensure input is valid and try again.",
  "details": [
    "Failed to parse message body."
  ]
}
```
### 403 response schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `message` | string | Yes |  |  |

### Example 403 response

```json
{
  "message": "Invalid authentication credentials"
}
```
### 404 response schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `message` | string | Yes |  |  |

### Example 404 response

```json
{
  "message": "Resource not found."
}
```

## Examples

### cURL

```bash
curl -X DELETE "https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/<id>?reason=I%20want%20do%20delete%20this%20number." \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/<id>?reason=I%20want%20do%20delete%20this%20number.", {
  method: "DELETE",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});

console.log(response.status);
```

## Error handling

- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Resource not found

## Related endpoints

- [Get all approved sender addresses](get-all-approved-sender-addresses.md)
- [Get sender address by id](get-sender-address-by-id.md)
- [Request a Sender Address](request-sender-address-using-post.md)

## Specification details

Remove an approved sender address from your account.

The path `id` must be the **sender address** UUID from **Get all approved sender addresses**.
Using the **request** UUID from **Request a Sender Address** will return `404 Not found`.


[← Source Address](index.md)
