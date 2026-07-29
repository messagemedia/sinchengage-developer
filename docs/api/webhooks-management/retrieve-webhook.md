# Retrieve webhook

Retrieve all the webhooks created for the connected account.

A successful request will return a paginated response body as follows:

```json
{
    "page": 0,
    "pageSize": 100,
    "pageData": [
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
    ]
}
```

| | |
|---|---|
| **Service** | [Webhooks Management](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/webhooks/messages` |
| **Operation ID** | `RetrieveWebhook` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports two authentication methods:

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

None.

### Query parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page` | integer (int32) | No | Page number for pagination (0-based). Example: `0` |
| `page_size` | integer (int32) | No | Number of results per page. Example: `20` |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Successful response | Paginated webhook list |
| 400 | Invalid request parameters | Error object |
| 401 | No valid authentication details were provided | — |

### 200 response schema

| Property | Type | Description |
|----------|------|-------------|
| `page` | integer (int32) | The current page number (0-based). |
| `pageSize` | integer (int32) | The number of webhooks returned per page. |
| `pageData` | array | The list of webhooks created for the connected account. |

#### pageData item schema

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

| Property | Type | Description |
|----------|------|-------------|
| `message` | string | Error message describing the issue |

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/webhooks/messages?page=0&page_size=20" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/webhooks/messages?page=0&page_size=20", {
  method: "GET",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});

const result = await response.json();
console.log(result.pageData);
```

## Error handling

- **400 Bad Request**: Returned when the `page` query parameter is not valid or the `pageSize` query parameter is not valid.
- **401 Unauthorized**: No valid authentication details were provided.

## Related endpoints

- [Create webhook](create-webhook.md)
- [Update webhook](update-webhook.md)
- [Delete webhook](delete-webhook.md)

[← Webhooks Management](index.md)
