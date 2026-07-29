# Create webhook

Create a webhook for one or more of the specified events.

A webhook would typically have the following structure:

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
  "template": "{\"id\":\"$mtId\",\"status\":\"$statusCode\"}",
  "read_timeout": 5000,
  "retries": 3,
  "retry_delay": 30
}
```

| | |
|---|---|
| **Service** | [Webhooks Management](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/webhooks/messages` |
| **Operation ID** | `CreateWebhook` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports two authentication methods:

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
| `url` | string | Yes | HTTP(S) URL for the webhook endpoint. Max 1000 characters. |
| `method` | string | Yes | HTTP method used when invoking the webhook. Enum: `GET`, `POST`, `PATCH`, `PUT`, `DELETE` |
| `encoding` | string | Yes | Content encoding for the webhook request body. Enum: `JSON`, `FORM_ENCODED`, `XML` |
| `events` | array of strings | Yes | Non-empty set of webhook event types to subscribe to. At least one event must be specified. |
| `headers` | object | No | Optional map of custom headers. Content-Type header is not allowed. Key max length is 200 characters, value max length is 1000 characters. |
| `template` | string | No | Optional Velocity template for the webhook request body. |
| `read_timeout` | integer | No | The read timeout for the webhook call in milliseconds. Range: 1-60000. |
| `retries` | integer | No | The number of times to retry a failed webhook call. Range: 0-5. |
| `retry_delay` | integer | No | The delay between retries in seconds. Range: 5-60. |

### Supported Events

You can select all events or combine them, but at least one event must be used.

**SMS**
- `RECEIVED_SMS` - Receive an SMS
- `OPT_OUT_SMS` - Opt-out occurred

**MMS**
- `RECEIVED_MMS` - Receive an MMS

**DR (Delivery Reports)**
- `ENROUTE_DR` - Message is enroute
- `EXPIRED_DR` - Message has expired
- `REJECTED_DR` - Message is rejected
- `FAILED_DR` - Message has failed
- `DELIVERED_DR` - Message is delivered
- `SUBMITTED_DR` - Message is submitted

### Template Parameters

You can customize the webhook payload using Velocity template parameters. If using JSON encoding, you must escape the JSON in the template value.

| Data | Parameter Name | Example | Event Type |
|------|----------------|---------|------------|
| Service Type | `$format`, `$type` | `SMS` | DR, MO, MO MMS |
| Message ID | `$mtId`, `$messageId` | `877c19ef-fa2e-4cec-827a-e1df9b5509f7` | DR, MO, MO MMS |
| Delivery Report ID | `$drId`, `$reportId` | `01e1fa0a-6e27-4945-9cdb-18644b4de043` | DR |
| Reply ID | `$moId`, `$replyId` | `a175e797-2b54-468b-9850-41a3eab32f74` | MO, MO MMS |
| Account ID | `$accountId` | `DeveloperPortal7000` | DR, MO, MO MMS |
| Message Timestamp | `$submittedTimestamp` | `2016-12-07T08:43:00.850Z` | DR, MO, MO MMS |
| Provider Timestamp | `$receivedTimestamp` | `2016-12-07T08:44:00.850Z` | DR, MO, MO MMS |
| Message Status | `$status` | `enroute` | DR |
| Status Code | `$statusCode` | `200` | DR |
| External Metadata | `$metadata.get('key')` | `name` | DR, MO, MO MMS |
| Source Address | `$sourceAddress` | `+61491570156` | DR, MO, MO MMS |
| Destination Address | `$destinationAddress` | `+61491593156` | MO, MO MMS |
| Message Content | `$mtContent`, `$messageContent`, `$esc.json($!mtContent)` | `Hi Derp` | DR, MO, MO MMS |
| Reply Content | `$moContent`, `$replyContent`, `$esc.json($!moContent)` | `Hello Derpina` | MO, MO MMS |
| Retry Count | `$retryCount` | `1` | DR, MO, MO MMS |
| Billing Unit | `$billingUnits` | `1` | DR |
| Attachments | `$attachments` | Array of attachment objects | MO MMS |

*Note: `$type` will be deprecated in the future; use `$format` instead.*

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
  "template": "{\"id\":\"$mtId\",\"status\":\"$statusCode\"}",
  "read_timeout": 5000,
  "retries": 3,
  "retry_delay": 30
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | Webhook successfully created | Webhook object |
| 400 | Invalid request | Error object |
| 401 | No valid authentication details were provided | — |
| 409 | A webhook with the given url and method already exists | Error object |

### 201 response schema

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

### 400/409 response schema

| Property | Type | Description |
|----------|------|-------------|
| `message` | string | Error message describing the issue |

## Examples

### cURL

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/webhooks/messages" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "http://webhook.com",
    "method": "POST",
    "encoding": "JSON",
    "headers": {},
    "events": ["ENROUTE_DR", "DELIVERED_DR"],
    "template": "{\"id\":\"$mtId\",\"status\":\"$statusCode\"}",
    "read_timeout": 5000,
    "retries": 3,
    "retry_delay": 30
  }'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/webhooks/messages", {
  method: "POST",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: "http://webhook.com",
    method: "POST",
    encoding: "JSON",
    headers: {},
    events: ["ENROUTE_DR", "DELIVERED_DR"],
    template: '{"id":"$mtId","status":"$statusCode"}',
    read_timeout: 5000,
    retries: 3,
    retry_delay: 30
  })
});

const webhook = await response.json();
console.log(webhook);
```

## Error handling

- **400 Bad Request**: Returned if the `url` is invalid, the `events`, `encoding` or `method` is null, or the `headers` contains a Content-Type attribute.
- **401 Unauthorized**: No valid authentication details were provided.
- **409 Conflict**: A webhook with the given url and method already exists. Each combination of URL and HTTP method must be unique.

## Related endpoints

- [Retrieve webhook](retrieve-webhook.md)
- [Update webhook](update-webhook.md)
- [Delete webhook](delete-webhook.md)

[← Webhooks Management](index.md)
