# Confirm replies as received

Mark replies as confirmed so they are no longer returned by [Check replies](check-replies.md). Up to 100 IDs per request. Retention: 45 days.

| | |
|---|---|
| **Service** | [Replies](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/replies/confirmed` |
| **Operation ID** | `ConfirmRepliesAsReceived` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `202` — Requested replies will be marked as confirmed |
| **Required body** | `reply_ids` (array of UUIDs, max 100) |

### Minimal request

```json
{
  "reply_ids": [
    "011dcead-6988-4ad6-a1c7-6b6c68ea628d"
  ]
}
```

Confirm **reply** UUIDs, not the original message UUIDs.

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

None.

### Query parameters

None.

### Header parameters

None.

## Request body

- **Content-Type:** `application/json`
- **Required:** true

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `reply_ids` | array of string (uuid) | Yes | The UUID of the *reply* to be confirmed (note: not the UUID of the message it is in response to). Max items: 100. |

### Example request body

```json
{
  "reply_ids": [
    "011dcead-6988-4ad6-a1c7-6b6c68ea628d",
    "3487b3fa-6586-4979-a233-2d1b095c7718",
    "ba28e94b-c83d-4759-98e7-ff9c7edb87a1"
  ]
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 202 | Requested replies will be marked as confirmed | object (`text/plain`) |
| 400 | Bad request | `400response` |
| 401 | Unauthorized | `403response` |
| 404 | Resource not found | `404response` |

### 202 response schema

- **Content-Type:** `text/plain`
- **Schema:** `type: object`
- **Description:** Requested replies will be marked as confirmed

No properties are declared on this response schema.

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
curl -X POST "https://eu.app.api.sinch.com/v1/replies/confirmed" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "reply_ids": [
      "011dcead-6988-4ad6-a1c7-6b6c68ea628d",
      "3487b3fa-6586-4979-a233-2d1b095c7718",
      "ba28e94b-c83d-4759-98e7-ff9c7edb87a1"
    ]
  }'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/replies/confirmed", {
  method: "POST",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    reply_ids: [
      "011dcead-6988-4ad6-a1c7-6b6c68ea628d",
      "3487b3fa-6586-4979-a233-2d1b095c7718",
      "ba28e94b-c83d-4759-98e7-ff9c7edb87a1"
    ]
  })
});

console.log(response.status);
```

## Error handling

- **400 Bad Request**: Bad request. Returned when the request body is invalid.
- **401 Unauthorized**: Unauthorized. Verify Basic or HMAC credentials on the request.
- **404 Not Found**: Resource not found.

## Related endpoints

- [Check replies](check-replies.md)

## Specification details

Mark a reply message as confirmed so it is no longer returned in check replies requests.

The confirm replies endpoint is intended to be used in conjunction with the check replies endpoint to allow for robust processing of reply messages. Once one or more reply messages have been processed they can then be confirmed using the confirm replies endpoint so they are no longer returned in subsequent check replies requests.

The confirm replies endpoint takes a list of reply IDs as follows:

```json
{
    "reply_ids": [
        "011dcead-6988-4ad6-a1c7-6b6c68ea628d",
        "3487b3fa-6586-4979-a233-2d1b095c7718",
        "ba28e94b-c83d-4759-98e7-ff9c7edb87a1"
    ]
}
```

The expiry date for getting an entity is 45 days. Up to 100 replies can be confirmed in a single confirm replies request.

[← Replies](index.md)
