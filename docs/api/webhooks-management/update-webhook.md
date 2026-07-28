# Update webhook

Update a webhook. You can update individual attributes or all of them by submitting a PATCH request to the /webhooks/messages endpoint (the same endpoint used above to delete a webhook)

A successful request to the retrieve webhook endpoint will return a response body as follows:

```
{
    "id": "76fa7010-8c1f-4a24-917a-4d62a54e744d",
    "url": "http://webhook.com",
    "method": "POST",
    "encoding": "JSON",
    "headers": {
        "Account": "DeveloperPortal7000"
    },
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

*Note: Only pre-created webhooks can be deleted. If an invalid or non existent webhook ID parameter is specified in the request, then a HTTP 404 Not Found response will be returned.*

| | |
|---|---|
| **Service** | [Webhooks Management](index.md) |
| **Method** | `PATCH` |
| **URL** | `https://eu.app.api.sinch.com/v1/webhooks/messages/{webhookId}` |
| **Operation ID** | `UpdateWebhook` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports the following schemes:

- **Basic Auth** (`basic_auth`): HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth** (`hmac_auth`): HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | `string` (`uuid`) | Yes | Unique identifier of the webhook. Example: `7ca628a8-08b0-4e42-aeb8-960b37049c31` |

### Query parameters

None.

### Header parameters

None.

## Request body

- **Content-Type:** `application/json`
- **Required:** true

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | `string` | Yes | The configured URL which will trigger the webhook when a selected event occurs. |
| `method` | `string` | Yes | HTTP method used when invoking the webhook. |
| `encoding` | `string` | Yes | Delivery content type: `JSON`, `FORM_ENCODED`, or `XML`. |
| `events` | `array` of `string` | Yes | Webhook event types to subscribe to. |
| `template` | `string` | Yes | Structure of the payload returned by the webhook (JSON or XML string). |

### Example request body

```json
{
  "url": "http://webhook.com",
  "method": "POST",
  "encoding": "JSON",
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
| `200` | Webhook updated successfully | [CreateWebhookresponse](#200-response-schema) |
| `400` | Unexpected error in API call. See HTTP response body for details. | [Error response](#400-response-schema) |
| `401` | No valid authentication details were provided | — |
| `404` | Not found. | — |

### 200 response schema

The updated webhook object. Only `id`, `url`, and `method` are required.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` (`uuid`) | Yes | Unique identifier for the webhook. |
| `url` | `string` | Yes | The configured URL which triggers the webhook when a selected event occurs. |
| `method` | `string` | Yes | HTTP method used when invoking the webhook. |
| `encoding` | `string` | No | Delivery content type: `JSON`, `FORM_ENCODED`, or `XML`. |
| `headers` | `object` ([Headers](#headers)) | No | HTTP header fields for the webhook request. |
| `events` | `array` of `string` | No | Webhook event types subscribed to. |
| `template` | `string` | No | Structure of the payload returned by the webhook (JSON or XML string). |
| `read_timeout` | `integer` | No | The read timeout for the webhook call in milliseconds. |
| `retries` | `integer` | No | The number of times to retry a failed webhook call. |
| `retry_delay` | `integer` | No | The delay between retries in seconds. |

#### Headers

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Account` | `string` | No | Example: `DeveloperPortal7000` |

#### Example

```json
{
  "id": "76fa7010-8c1f-4a24-917a-4d62a54e744d",
  "url": "http://webhook.com",
  "method": "POST",
  "encoding": "JSON",
  "headers": {
    "Account": "DeveloperPortal7000"
  },
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

### 400 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | `string` | Yes | Error message. |

#### Example

```json
{
  "message": "Something went wrong. Please try again later."
}
```

## Examples

### cURL

```bash
curl -X PATCH "https://eu.app.api.sinch.com/v1/webhooks/messages/7ca628a8-08b0-4e42-aeb8-960b37049c31" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic Base64(api_key:api_secret)" \
  -d '{
    "url": "http://webhook.com",
    "method": "POST",
    "encoding": "JSON",
    "events": [
      "ENROUTE_DR",
      "DELIVERED_DR"
    ],
    "template": "{\"id\":\"$mtId\",\"status\":\"$statusCode\"}"
  }'
```

### JavaScript (fetch)

```javascript
const webhookId = "7ca628a8-08b0-4e42-aeb8-960b37049c31";

const response = await fetch(
  `https://eu.app.api.sinch.com/v1/webhooks/messages/${webhookId}`,
  {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("api_key:api_secret"),
    },
    body: JSON.stringify({
      url: "http://webhook.com",
      method: "POST",
      encoding: "JSON",
      events: ["ENROUTE_DR", "DELIVERED_DR"],
      template: '{"id":"$mtId","status":"$statusCode"}',
    }),
  }
);

const data = await response.json();
```

## Error handling

- **`400`**: Unexpected error in the API call. See the HTTP response body for details. Body includes a `message` string.
- **`401`**: No valid authentication details were provided.
- **`404`**: Not found. Returned when an invalid or non-existent webhook ID is specified.

## Related endpoints

- [Create webhook](create-webhook.md)
- [Retrieve webhook](retrieve-webhook.md)
- [Delete webhook](delete-webhook.md)

[← Webhooks Management](index.md)
