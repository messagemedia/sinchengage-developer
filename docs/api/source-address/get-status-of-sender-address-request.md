# Get status of a sender address request

Retrieve the current state of a sender address registration request.

| | |
|---|---|
| **Service** | [Source Address](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/requests/{id}` |
| **Operation ID** | `GetStatusOfSenderAddressRequest` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — Get the status of Sender Address Request |
| **Required** | `id` |

### Example success body

```json
{
  "id": "6f79a12e-14f1-4776-adc0-5c5e48a999b7",
  "sender_address": "EXAMPLE",
  "sender_address_type": "ALPHANUMERIC",
  "usage_type": "ALPHANUMERIC",
  "destination_countries": [
    "AU"
  ],
  "reason": "This is my reason",
  "label": "label",
  "status": "OPEN",
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
| `id` | string | Yes | 36 character UUID. |  |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Get the status of Sender Address Request | `AlphaTagRequestItem` |
| 400 | Bad request | `400response` |
| 401 | Unauthorized | None |
| 403 | Forbidden | `403response` |
| 404 | Resource not found | `404response` |

### 200 response schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `id` | string (uuid) | No | Primary ID of the record |  |
| `sender_address` | string | No | The Alpha tag to be requested |  |
| `sender_address_type` | string | No | The Sender Address Type | Enum: `ALPHANUMERIC` |
| `usage_type` | string | No | The Sender Address Usage Type | Enum: `ALPHANUMERIC` |
| `destination_countries` | array of string | No | list of 2-character ISO country codes this sender address applies to |  |
| `reason` | string | No |  |  |
| `label` | string | No |  |  |
| `status` | string | No |  | Enum: `OPEN`, `PENDING`, `REJECTED`, `APPROVED` |
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
curl -X GET "https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/requests/<id>" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/requests/<id>", {
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
- **404**: Resource not found

## Related endpoints

- [Request a Sender Address](request-sender-address-using-post.md)
- [Submitting a verification code](submitting-verification-code-post.md)
- [Get all approved sender addresses](get-all-approved-sender-addresses.md)

## Specification details

Retrieve the current status of a sender address request using the request ID returned in the sender address request endpoint.
A successful request to the get message status endpoint will return a response body as follows:
```json
{
    "id": "365dd65f-7101-46cd-8e79-e49c5620eb15",
    "sender_address": "sample",
    "sender_address_type": "ALPHANUMERIC",
    "usage_type": "ALPHANUMERIC",
    "destination_countries": [
      "AU"
    ],
    "reason": "This is my approval reason",
    "label": "label"
    "status": "APPROVED",
    "account_id": "sample",
    "created_date": "2023-09-07T05:48:26.741Z",
    "last_modified_date": "2023-09-07T05:49:20.888Z"
}
```


[← Source Address](index.md)
