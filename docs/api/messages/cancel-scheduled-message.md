# Cancel scheduled message

Cancel a message that is still `scheduled` and has not yet been delivered, by setting `status` to `cancelled`.

| | |
|---|---|
| **Service** | [Messages](index.md) |
| **Method** | `PUT` |
| **URL** | `https://eu.app.api.sinch.com/v1/messages/{messageId}` |
| **Operation ID** | `CancelScheduledMessage` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — Message status updated successfully (no response body schema) |
| **Required** | Path `messageId`; body `{ "status": "cancelled" }` |

### Request body

```json
{
  "status": "cancelled"
}
```

Only messages with status `scheduled` can be cancelled. Unknown `messageId` → `404`. Entity retention is 45 days.

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | string | Yes | 36 character UUID. Example: `389dc1a8-62a4-4110-ba61-af94806c006f` |

### Query parameters

None.

### Header parameters

None.

## Request body

- **Content-Type:** `application/json`
- **Required:** true

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | string | Yes | Must be set to `cancelled`. |

### Example request body

```json
{
  "status": "cancelled"
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Message status updated successfully | — |
| 400 | Bad request | `400response` |
| 401 | Unauthorized | `403response` |
| 404 | Resource not found | `404response` |

### 200 response

No response body schema is declared for this status.

### 400 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |
| `details` | array of strings | Yes | Additional error detail messages. |

### Example 400 response

```json
{
  "message": "Request failed to parse correctly. Please ensure input is valid and try again.",
  "details": [
    "Failed to parse message body."
  ]
}
```

### 401 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

### Example 401 response

```json
{
  "message": "Invalid authentication credentials"
}
```

### 404 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

### Example 404 response

```json
{
  "message": "Resource not found."
}
```

## Examples

### cURL

```bash
curl -X PUT "https://eu.app.api.sinch.com/v1/messages/389dc1a8-62a4-4110-ba61-af94806c006f" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "status": "cancelled"
  }'
```

### JavaScript (fetch)

```javascript
const messageId = "389dc1a8-62a4-4110-ba61-af94806c006f";
const response = await fetch(`https://eu.app.api.sinch.com/v1/messages/${messageId}`, {
  method: "PUT",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    status: "cancelled"
  })
});

console.log(response.status);
```

## Error handling

- **400 Bad Request**: Bad request. Returned when the request body is invalid.
- **401 Unauthorized**: Unauthorized. Verify Basic or HMAC credentials on the request.
- **404 Not Found**: Resource not found. Returned when an invalid or nonexistent `messageId` is specified. Only messages with status `scheduled` can be cancelled. Message entities expire after 45 days.

## Related endpoints

- [Send messages](send-messages.md)
- [Get message status](get-message-status.md)

## Specification details

Cancel a scheduled message that has not yet been delivered.

A scheduled message can be cancelled by updating the status of a message from `scheduled` to `cancelled`. This is done by submitting a PUT request to the messages endpoint using the message ID as a parameter (the same endpoint used above to retrieve the status of a message). The expiry date for getting an entity is 45 days.

The body of the request simply needs to contain a `status` property with the value set to `cancelled`.

```json
{
    "status": "cancelled"
}
```

*Note: Only messages with a status of scheduled can be cancelled. If an invalid or nonexistent message ID parameter is specified in the request, then a HTTP 404 Not Found response will be returned*

[← Messages](index.md)
