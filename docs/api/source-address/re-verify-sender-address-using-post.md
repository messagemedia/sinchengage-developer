# Re-verify Sender Address

Start the annual 2FA reverification process for an approved own-number sender address.

| | |
|---|---|
| **Service** | [Source Address](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/{id}/reverify` |
| **Operation ID** | `reVerifySenderAddressUsingPOST` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — OK |
| **Required** | `id` |

### Example success body

```json
{
  "id": "6f79a12e-14f1-4776-adc0-5c5e48a999b7",
  "sender_address": "+61450999999",
  "sender_address_type": "INTERNATIONAL",
  "usage_type": "OWN_NUMBER",
  "destination_countries": [
    "AU",
    "NZ",
    "US"
  ],
  "reason": "my company is example.com",
  "label": "Example Address",
  "status": "PENDING",
  "account_id": "XYZ_ExampleAccount",
  "created_date": "<created_date>",
  "last_modified_date": "<last_modified_date>"
}
```

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `id` | string | Yes | Sender Address ID |  |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | `ReVerifySenderAddressRequestItem` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | None |
| 403 | Forbidden | `403response` |
| 404 | Resource not found | `404response` |

### 200 response schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `id` | string (uuid) | No | Primary ID of the record |  |
| `sender_address` | string | No | The Sender Address to be requested |  |
| `sender_address_type` | string | No | The Sender Address Type | Enum: `INTERNATIONAL` |
| `usage_type` | string | No | The Sender Address Usage Type | Enum: `OWN_NUMBER` |
| `destination_countries` | array of string | No | list of 2-character ISO country codes this sender address applies to |  |
| `reason` | string | No |  |  |
| `label` | string | No |  |  |
| `status` | string | No |  | Enum: `PENDING` |
| `account_id` | string | No |  |  |
| `created_date` | string (date-time) | No |  |  |
| `last_modified_date` | string (date-time) | No |  |  |
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
curl -X POST "https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/<id>/reverify" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/<id>/reverify", {
  method: "POST",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
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
- [Submitting a verification code](submitting-verification-code-post.md)
- [Get sender address by id](get-sender-address-by-id.md)

## Specification details

The below table defines the allowed combination of `sender_address_type` and `usage_type` values

| Description      | sender_address_type | usage_type    |
| ---------------- | ------------------- | ------------  |
| Own Number       | INTERNATIONAL       | OWN_NUMBER    |

OWN_NUMBER Sender Addresses require reverification every 12 months to allow continued use.
The reverification process is quite similar to the original verification process for the Sender Address, and requires a fresh 2FA check.

To reverify an OWN_NUMBER Sender Address:
  1. Retrieve the UUID for the OWN_NUMBER using the **Get all approved sender addresses** endpoint
  2. Make a request to this endpoint to trigger the 2FA check
  3. Make a POST request to the **Submit verification code endpoint**, providing the new 2FA code in the body of the request


[← Source Address](index.md)
