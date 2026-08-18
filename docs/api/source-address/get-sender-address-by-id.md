# Get sender address by id

Retrieve one approved sender address using its sender address UUID.

| | |
|---|---|
| **Service** | [Source Address](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/{id}` |
| **Operation ID** | `GetSenderAddressById` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — A sender address for your account only |
| **Required** | `id` |

### Example success body

```json
{
  "id": "6f79a12e-14f1-4776-adc0-5c5e48a999b8",
  "sender_address": "+61401234567",
  "sender_address_type": "ALPHANUMERIC",
  "usage_type": "ALPHANUMERIC",
  "destination_countries": [
    "AU"
  ],
  "reason": "my personal number",
  "label": "ABC",
  "account_id": "XYZ_ExampleAccount",
  "created_date": "<created_date>",
  "last_modified_date": "<last_modified_date>",
  "expiry": "<expiry>",
  "display_status": "APPROVED"
}
```

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `id` | string (uuid) | Yes | Sender address UUID (from GET .../addresses/), not the request UUID |  |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | A sender address for your account only | `GetSenderAddress` |
| 400 | Bad request | `400response` |
| 401 | Unauthorized | None |
| 403 | Forbidden | `403response` |

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

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/<id>" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/<id>", {
  method: "GET",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});

const result = await response.json();
console.log(result);
```

## Error handling

- **400**: Bad request
- **401**: Unauthorized
- **403**: Forbidden

## Related endpoints

- [Get all approved sender addresses](get-all-approved-sender-addresses.md)
- [Update My Own Number Label](update-sender-address-using-patch.md)
- [Re-verify Sender Address](re-verify-sender-address-using-post.md)
- [Delete Sender Address](delete-sender-address-using-delete.md)
- [Send messages](../messages/send-messages.md)

## Specification details

Retrieve an approved sender address by its **sender address** UUID (from **Get all approved sender addresses**).
Do not use the request UUID returned by **Request a Sender Address**.


[← Source Address](index.md)
