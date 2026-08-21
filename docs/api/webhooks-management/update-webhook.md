# Update webhook

Update a webhook. You can update individual attributes or all of them by submitting a PATCH request.

**All fields in the request body are optional, but at least one must be provided.** An empty body or a body with all null fields will be rejected.

A successful request will return a response body as follows:

```json
{
    "id": "76fa7010-8c1f-4a24-917a-4d62a54e744d",
    "url": "http://webhook.com",
    "method": "POST",
    "encoding": "JSON",
    "headers": {},
    "events": [
        "ENROUTE_DR",
        "DELIVERED_DR"
    ],
    "template": "{\"id\":\"$mtId\",\"status\":\"$statusCode\"}",
    "read_timeout": 5000,
    "retries": 3,
    "retry_delay": 30
}
```

*Note: Only pre-created webhooks can be updated. If an invalid or non existent webhook ID parameter is specified in the request, then a HTTP 404 Not Found response will be returned.*

*Note: A 400 response will be returned if the request body cannot be parsed, the `url` is invalid (for example, malformed hostname or DNS syntax, unsupported scheme such as `ftp`, or path containing whitespace or control characters — e.g. `https://-invalid.com`, `https://invalid_.com`, `https:///path`, `https://:/path`, `http://.example.com`, `http://example..com`), an `events` value is not recognised (e.g. `RECEIVED_123`), the `events`, `encoding` or `method` is null, or the `headers` has a Content-Type attribute.*

| | |
|---|---|
| **Service** | [Webhooks Management](index.md) |
| **Method** | `PATCH` |
| **URL** | `https://eu.app.api.sinch.com/v1/webhooks/messages/{webhookId}` |
| **Operation ID** | `UpdateWebhook` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports two authentication methods:

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | string (uuid) | Yes | Unique identifier of the webhook. Example: `7ca628a8-08b0-4e42-aeb8-960b37049c31` |

### Query parameters

None.

### Header parameters

None.

## Request body

- **Content-Type:** `application/json`
- **Required:** true

All fields are optional, but at least one must be provided. Empty body (all fields null) is rejected.

> **Note:** `read_timeout`, `retries`, and `retry_delay` are not supported on update (create-only fields).

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | string | No | HTTP(S) URL for the webhook endpoint. Must use the `http` or `https` scheme. Hostnames must conform to RFC 1123 DNS name syntax. Paths must not contain whitespace or control characters. Invalid URLs are rejected with HTTP 400. Max length: 1000. |
| `method` | string | No | HTTP method used when invoking the webhook. Enum: `GET`, `POST`, `PATCH`, `PUT`, `DELETE` |
| `encoding` | string | No | Content encoding for the webhook request body. Enum: `JSON`, `FORM_ENCODED`, `XML` |
| `headers` | object | No | Optional map of custom headers. Content-Type header is not allowed. Key max length is 200 characters, value max length is 1000 characters. |
| `template` | string | No | Velocity template for the webhook request body. |
| `events` | array of strings | No | Webhook event types to subscribe to. If provided, must be non-empty (events: [] is rejected). |

### Example request body

```json
{
  "url": "http://webhook.com",
  "method": "POST",
  "encoding": "JSON",
  "headers": {},
  "events": [
    "ENROUTE_DR",
    "DELIVERED_DR"
  ],
  "template": "{\"id\":\"$mtId\",\"status\":\"$statusCode\"}"
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Webhook updated successfully | `CreateWebhookresponse` |
| 400 | Unexpected error in API call. See HTTP response body for details. | `UpdateWebhook400response` |
| 401 | No valid authentication details were provided | — |
| 404 | Not found. | — |

### 200 response schema

Webhook response object. No fields are strictly required in the schema; however, `id`, `url`, `method`, and `retries` are consistently populated.

| Property | Type | Description |
|----------|------|-------------|
| `id` | string (uuid) | Unique identifier for the webhook. Always present. |
| `url` | string | HTTP(S) URL for the webhook endpoint. Always present. |
| `method` | string | HTTP method used when invoking the webhook. Always present. |
| `encoding` | string | Content encoding. Usually present; can be null if missing/unknown. |
| `headers` | object | Custom headers configured for the webhook. May be empty. |
| `events` | array of strings | Webhook event types subscribed to. May be empty. |
| `template` | string | Velocity template for the webhook request body. Only present if set. |
| `read_timeout` | integer | The read timeout in milliseconds. Only present if set. |
| `retries` | integer | The number of retry attempts. Always present (defaults to 0). |
| `retry_delay` | integer | The delay between retries in seconds. Only present when retries are configured. |

### 400 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |
| `details` | array of strings | No | Additional error detail messages. |

#### Example 400 responses

**Invalid URL**

```json
{
  "message": "Bad Request",
  "details": [
    "/url: Not a valid http url"
  ]
}
```

**Unrecognised event type**

```json
{
  "message": "Bad Request",
  "details": [
    "/events/0: [RECEIVED_123] is invalid"
  ]
}
```

**Unparseable request body**

```json
{
  "message": "Bad Request",
  "details": [
    "Failed to parse message body."
  ]
}
```

## Examples

### cURL

```bash
curl -X PATCH "https://eu.app.api.sinch.com/v1/webhooks/messages/76fa7010-8c1f-4a24-917a-4d62a54e744d" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "http://new-webhook-url.com",
    "events": ["DELIVERED_DR", "FAILED_DR"]
  }'
```

### JavaScript (fetch)

```javascript
const webhookId = "76fa7010-8c1f-4a24-917a-4d62a54e744d";

const response = await fetch(`https://eu.app.api.sinch.com/v1/webhooks/messages/${webhookId}`, {
  method: "PATCH",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: "http://new-webhook-url.com",
    events: ["DELIVERED_DR", "FAILED_DR"]
  })
});

const webhook = await response.json();
console.log(webhook);
```

## Error handling

- **400 Bad Request**: Unexpected error in API call. See HTTP response body for details. Returned when the request body cannot be parsed, the `url` is invalid (malformed hostname or DNS syntax, unsupported scheme, or invalid path), an `events` value is not recognised, the `events`, `encoding` or `method` is null, the `headers` has a Content-Type attribute, the body is empty, all fields are null, or `events: []` is supplied (per operation note). Example responses:
  - Invalid URL: `"details": ["/url: Not a valid http url"]`
  - Unrecognised event: `"details": ["/events/0: [RECEIVED_123] is invalid"]`
  - Unparseable body: `"details": ["Failed to parse message body."]`
- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials on the request.
- **404 Not Found**: Not found. Returned when an invalid or non existent `webhookId` is specified in the request (per operation note).

## Related endpoints

- [Create webhook](create-webhook.md)
- [Retrieve webhook](retrieve-webhook.md)
- [Delete webhook](delete-webhook.md)

[← Webhooks Management](index.md)
