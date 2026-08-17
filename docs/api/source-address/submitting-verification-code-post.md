# Submitting a verification code

Complete personal-number registration by submitting the six-digit SMS verification code.

| | |
|---|---|
| **Service** | [Source Address](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/requests/{id}/verify` |
| **Operation ID** | `SubmittingVerificationCodePost` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `201` — Created |
| **Required** | `id`, `verification_code` |

### Minimal request

```json
{
  "verification_code": "123456"
}
```

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `id` | string | Yes | 36 character UUID. |  |

### Query parameters

None.

### Header parameters

None.

## Request body

- **Content-Type:** `application/json`
- **Required:** true
- **Description:** Verification code to be verified

### Schema (`PostVerificationCode`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `verification_code` | string | Yes | Verify Sender Address Request |  |

### Example request body

```json
{
  "verification_code": "123456"
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | Created | `VerificationCodeRequestItem` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | None |
| 403 | Forbidden | `403response` |
| 404 | Resource not found | `404response` |

### 201 response schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `id` | string (uuid) | No | Primary ID of the record |  |
| `sender_address` | string | No | The Own Number to be requested |  |
| `sender_address_type` | string | No | The Sender Address Type | Enum: `INTERNATIONAL` |
| `usage_type` | string | No | The Sender Address Usage Type | Enum: `OWN_NUMBER` |
| `destination_countries` | array of string | No | list of 2-character ISO country codes this sender address applies to |  |
| `reason` | string | No |  |  |
| `label` | string | No |  |  |
| `status` | string | No |  | Enum: `PENDING`, `REJECTED`, `APPROVED` |
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
curl -X POST "https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/requests/<id>/verify" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "verification_code": "123456"
  }'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/requests/<id>/verify", {
  method: "POST",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    verification_code: "123456"
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

- [Request a Sender Address](request-sender-address-using-post.md)
- [Get status of a sender address request](get-status-of-sender-address-request.md)
- [Get all approved sender addresses](get-all-approved-sender-addresses.md)

## Specification details

Complete the 2FA verification process required to register a Personal Number as a Sender ID.
The following parameters are required for this request:
  - ```id:``` The UUID received in the API response of your request to the **Request a Sender Address** endpoint.
  - ```verification_code:``` The six-digit code received via SMS to the phone number that you are attempting to register


[← Source Address](index.md)
