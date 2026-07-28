# Retrieve webhook

Retrieve all the webhooks created for the connected account.

A successful request to the retrieve webhook endpoint will return a response body as follows:

```
{
    "page": 0,
    "pageSize": 100,
    "pageData": [
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
    ]
}
```

*Note: Response 400 is returned when the `page` query parameter is not valid or the `pageSize` query parameter is not valid.*

| | |
|---|---|
| **Service** | [Webhooks Management](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/webhooks/messages` |
| **Operation ID** | `RetrieveWebhook` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports the following schemes:

- **Basic Auth** (`basic_auth`): HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth** (`hmac_auth`): HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

None.

### Query parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page` | `integer` (`int32`) | No | Page number for pagination (1-based). Example: `1` |
| `page_size` | `integer` (`int32`) | No | Number of results per page. Example: `20` |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| `200` | Successful response. | [RetrieveWebhookresponse](#200-response-schema) |
| `400` | Unexpected error in API call. See HTTP response body for details. | [Error response](#400-response-schema) |
| `401` | No valid authentication details were provided | — |

### 200 response schema

A paginated list of webhooks configured for the connected account.

| Property | Type | Description |
|----------|------|-------------|
| `page` | `integer` (`int32`) | The current page number. |
| `pageSize` | `integer` (`int32`) | The number of webhooks returned per page. |
| `pageData` | `array` of [Webhook object](#webhook-object) | The list of webhooks created for the connected account. |

#### Webhook object

Each entry in `pageData` is a webhook object. Only `id`, `url`, and `method` are required.

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

##### Headers

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Account` | `string` | No | Example: `DeveloperPortal7000` |

#### Example

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
  ]
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
curl -X GET "https://eu.app.api.sinch.com/v1/webhooks/messages?page=1&page_size=20" \
  -H "Accept: application/json" \
  -H "Authorization: Basic Base64(api_key:api_secret)"
```

### JavaScript (fetch)

```javascript
const response = await fetch(
  "https://eu.app.api.sinch.com/v1/webhooks/messages?page=1&page_size=20",
  {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Basic " + btoa("api_key:api_secret"),
    },
  }
);

const data = await response.json();
```

## Error handling

- **`400`**: Returned when the `page` query parameter is not valid or the `pageSize` / `page_size` query parameter is not valid. The response body includes a `message` string.
- **`401`**: No valid authentication details were provided.

## Related endpoints

- [Create webhook](create-webhook.md)
- [Update webhook](update-webhook.md)
- [Delete webhook](delete-webhook.md)

[← Webhooks Management](index.md)
