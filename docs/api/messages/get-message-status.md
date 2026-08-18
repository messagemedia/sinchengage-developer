# Get message status

Retrieve the current status of a message using the `message_id` returned by [Send messages](send-messages.md). Entities are retained for 45 days.

| | |
|---|---|
| **Service** | [Messages](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/messages/{messageId}` |
| **Operation ID** | `GetMessageStatus` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — The submitted message including the status of the message |
| **Required** | Path `messageId` (36-character UUID) |

### Example success body

```json
{
    "format": "SMS",
    "content": "My first message!",
    "metadata": {
        "key1": "value1",
        "key2": "value2"
    },
    "message_id": "877c19ef-fa2e-4cec-827a-e1df9b5509f7",
    "callback_url": "https://my.callback.url.com",
    "delivery_report": true,
    "destination_number": "+61401760575",
    "scheduled": "2016-11-03T11:49:02.807Z",
    "source_number": "+61491570157",
    "source_number_type": "INTERNATIONAL",
    "message_expiry_timestamp": "2016-11-03T11:49:02.807Z",
    "status": "enroute"
}
```

`status` is the current delivery state. See Delivery Reports documentation for status meanings. Invalid or unknown `messageId` → `404`.

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

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | The submitted message including the status of the message | `Getmessagestatusresponse` |
| 401 | Unauthorized | `403response` |
| 404 | Resource not found | `404response` |

### 200 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `callback_url` | string | No | URL replies and delivery reports to this message will be pushed to |
| `content` | string | No | Content of the message. Min length: 1. Max length: 5000. |
| `destination_number` | string | No | Destination number of the message. Min length: 1. Max length: 15. |
| `delivery_report` | boolean | No | Request a delivery report for this message |
| `format` | string | No | Filter results by message format, using enumerable MessageType. Enum: `SMS`, `TTS`, `MMS` |
| `message_expiry_timestamp` | string (date-time) | No | Date time after which the message expires and will not be sent |
| `metadata` | object | No | Metadata for the message specified as a set of key value pairs, each key can be up to 100 characters long and each value can be up to 256 characters long |
| `scheduled` | string (date-time) | No | Scheduled delivery date time of the message |
| `source_number` | string | No | |
| `source_number_type` | string | No | Type of source address specified, this can be INTERNATIONAL, ALPHANUMERIC or SHORTCODE. Enum: `INTERNATIONAL`, `ALPHANUMERIC`, `SHORTCODE` |
| `message_id` | string (uuid) | No | Unique ID of this message |
| `status` | string | No | The status of the message. Enum: `undefined`, `queued`, `processing`, `processed`, `failed`, `scheduled`, `cancelled`, `delivered`, `expired`, `enroute`, `held`, `submitted`, `rejected`, `read` |

Notes for implementers:

- On this endpoint, `format` is the message’s channel (`SMS`, `TTS`, or `MMS`). The shared schema description also covers reporting filters.
- `source_number` has no schema description in the OpenAPI component.

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
curl -X GET "https://eu.app.api.sinch.com/v1/messages/389dc1a8-62a4-4110-ba61-af94806c006f" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const messageId = "389dc1a8-62a4-4110-ba61-af94806c006f";
const response = await fetch(`https://eu.app.api.sinch.com/v1/messages/${messageId}`, {
  method: "GET",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});

const message = await response.json();
console.log(message.status);
```

## Error handling

- **401 Unauthorized**: Unauthorized. Verify Basic or HMAC credentials on the request.
- **404 Not Found**: Resource not found. Returned when an invalid or nonexistent `messageId` is specified. Message status entities expire after 45 days.

## Related endpoints

- [Send messages](send-messages.md)
- [Cancel scheduled message](cancel-scheduled-message.md)

## Specification details

Retrieve the current status of a message using the message ID returned in the send messages endpoint.

A successful request to the get message status endpoint will return a response body as follows:

```json
{
    "format": "SMS",
    "content": "My first message!",
    "metadata": {
        "key1": "value1",
        "key2": "value2"
    },
    "message_id": "877c19ef-fa2e-4cec-827a-e1df9b5509f7",
    "callback_url": "https://my.callback.url.com",
    "delivery_report": true,
    "destination_number": "+61401760575",
    "scheduled": "2016-11-03T11:49:02.807Z",
    "source_number": "+61491570157",
    "source_number_type": "INTERNATIONAL",
    "message_expiry_timestamp": "2016-11-03T11:49:02.807Z",
    "status": "enroute"
}
```

The status property of the response indicates the current status of the message. See the Delivery Reports section of this documentation for more information on message statuses. The expiry date for getting an entity is 45 days.

*Note: If an invalid or nonexistent message ID parameter is specified in the request, then a HTTP 404 Not Found response will be returned*

[← Messages](index.md)
