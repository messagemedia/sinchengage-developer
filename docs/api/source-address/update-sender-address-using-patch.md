# Update My Own Number Label

Change the label assigned to an approved own-number sender address.

| | |
|---|---|
| **Service** | [Source Address](index.md) |
| **Method** | `PATCH` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/{id}` |
| **Operation ID** | `updateSenderAddressUsingPATCH` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — OK |
| **Required** | `id`, `label` |

### Minimal request

```json
{
  "label": "ExampleLabel"
}
```

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `id` | string (uuid) | Yes | Sender address UUID (from GET .../addresses), not the request UUID |  |

### Query parameters

None.

### Header parameters

None.

## Request body

- **Content-Type:** `application/json`
- **Required:** true
- **Description:** Input the label need to update

### Schema (`PatchLabelMyOwnNumber`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `label` | string | Yes | Label need to be updated | Max length: 100 |

### Example request body

```json
{
  "label": "ExampleLabel"
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | `GetSenderAddress` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | None |
| 403 | Forbidden | `403response` |
| 404 | Resource not found | `404response` |

### 200 response schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `id` | string (uuid) | No | Approved sender address UUID (use for get, update, re-verify, and delete) |  |
| `sender_address` | string | No | The sender address value (alpha tag or phone number as a string) |  |
| `sender_address_type` | string | No | The Sender Address Type | Enum: `ALPHANUMERIC`, `INTERNATIONAL`, `SHORT_CODE` |
| `usage_type` | string | No | The Sender Address Usage Type | Enum: `ALPHANUMERIC`, `OWN_NUMBER`, `DEDICATED`, `HOSTED_NUMBER` |
| `destination_countries` | array of string | No | list of 2-character ISO country codes this sender address applies to |  |
| `reason` | string | No |  |  |
| `label` | string | No |  |  |
| `account_id` | string | No |  |  |
| `created_date` | string (date-time) | No |  |  |
| `last_modified_date` | string (date-time) | No |  |  |
| `expiry` | string (date-time) | No | The Sender Address expiration time (apply for sender_address_type = OWN_NUMBER) |  |
| `display_status` | string | No |  | Enum: `APPROVED`, `EXPIRED`, `EXPIRING` |
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
curl -X PATCH "https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/<id>" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "ExampleLabel"
  }'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/<id>", {
  method: "PATCH",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    label: "ExampleLabel"
  })
});

const result = await response.json();
console.log(result);
```

## Error handling

- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Resource not found

## Related endpoints

- [Get all approved sender addresses](get-all-approved-sender-addresses.md)
- [Get sender address by id](get-sender-address-by-id.md)
- [Re-verify Sender Address](re-verify-sender-address-using-post.md)

## Specification details

Update label for my own number only.
The path `id` must be the **sender address** UUID from **Get all approved sender addresses**, not the request UUID.


[← Source Address](index.md)
