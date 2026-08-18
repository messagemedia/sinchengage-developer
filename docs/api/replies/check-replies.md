# Check replies

Return unconfirmed inbound replies (MO) for the account. Max 100 per response. Same replies repeat until confirmed. Prefer [Webhooks](../webhooks-management/index.md) over polling when possible. Retention: 45 days.

| | |
|---|---|
| **Service** | [Replies](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/replies` |
| **Operation ID** | `CheckReplies` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — Unconfirmed replies |
| **Required** | None (no path, query, or body parameters) |

### Poll pattern

1. Call this endpoint.
2. Process each `replies[]` item.
3. Confirm IDs with [Confirm replies as received](confirm-replies-as-received.md).

### Example success body

```json
{
  "replies": [
    {
      "metadata": {
        "key1": "value1",
        "key2": "value2"
      },
      "message_id": "877c19ef-fa2e-4cec-827a-e1df9b5509f7",
      "reply_id": "a175e797-2b54-468b-9850-41a3eab32f74",
      "date_received": "2016-12-07T08:43:00.850Z",
      "callback_url": "https://my.callback.url.com",
      "destination_number": "+61491570156",
      "source_number": "+61491570157",
      "vendor_account_id": {
        "vendor_id": "SinchEU",
        "account_id": "MyAccount"
      },
      "content": "My first reply!"
    }
  ]
}
```

Note: In a reply, source and destination numbers are inverted relative to the original outbound message. If the original message had no `source_number`, `destination_number` may be absent on the reply.

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

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Unconfirmed replies | `Checkrepliesresponse` |
| 401 | Unauthorized | `403response` |
| 404 | Resource not found | `404response` |

### 200 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `replies` | array | No | The oldest 100 unconfirmed replies. Min items: 0. Max items: 100. |

#### `replies` item schema (`Reply`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `callback_url` | string | No | The URL specified as the callback URL in the original submit message request |
| `content` | string | No | Content of the reply. Min length: 1. Max length: 5000. |
| `date_received` | string (date-time) | No | Date time when the reply was received |
| `destination_number` | string | No | Address from which this reply was sent to. Min length: 1. Max length: 15. |
| `message_id` | string (uuid) | No | Unique ID of the original message |
| `metadata` | object | No | Any metadata that was included in the original submit message request |
| `reply_id` | string (uuid) | No | Unique ID of this reply |
| `source_number` | string | No | Address from which this reply was received from. Min length: 1. Max length: 15. |
| `vendor_account_id` | object | No | |

##### `vendor_account_id` schema (`VendorAccountId`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `vendor_id` | string | No | |
| `account_id` | string | No | The account used to submit the original message. |

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
curl -X GET "https://eu.app.api.sinch.com/v1/replies" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/replies", {
  method: "GET",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});

const result = await response.json();
console.log(result.replies);
```

## Error handling

- **401 Unauthorized**: Unauthorized. Verify Basic or HMAC credentials on the request.
- **404 Not Found**: Resource not found.

## Related endpoints

- [Confirm replies as received](confirm-replies-as-received.md)
- [Send messages](../messages/send-messages.md)
- [Check delivery reports](../delivery-reports/check-delivery-reports.md)

## Specification details

Check for any replies that have been received.

Replies are messages that have been sent from a handset in response to a message sent by an application or messages that have been sent from a handset to a inbound number associated with an account, known as a dedicated inbound number (contact <support@app.sinch.com> for more information on dedicated inbound numbers).

Each request to the check replies endpoint will return any replies received that have not yet been confirmed using the confirm replies endpoint. A response from the check replies endpoint will have the following structure:

```json
{
    "replies": [
        {
            "metadata": {
                "key1": "value1",
                "key2": "value2"
            },
            "message_id": "877c19ef-fa2e-4cec-827a-e1df9b5509f7",
            "reply_id": "a175e797-2b54-468b-9850-41a3eab32f74",
            "date_received": "2016-12-07T08:43:00.850Z",
            "callback_url": "https://my.callback.url.com",
            "destination_number": "+61491570156",
            "source_number": "+61491570157",
            "vendor_account_id": {
                "vendor_id": "SinchEU",
                "account_id": "MyAccount"
            },
            "content": "My first reply!"
        },
        {
            "metadata": {
                "key1": "value1",
                "key2": "value2"
            },
            "message_id": "8f2f5927-2e16-4f1c-bd43-47dbe2a77ae4",
            "reply_id": "3d8d53d8-01d3-45dd-8cfa-4dfc81600f7f",
            "date_received": "2016-12-07T08:43:00.850Z",
            "callback_url": "https://my.callback.url.com",
            "destination_number": "+61491570157",
            "source_number": "+61491570158",
            "vendor_account_id": {
                "vendor_id": "SinchEU",
                "account_id": "MyAccount"
            },
            "content": "My second reply!"
        }
    ]
}
```

Each reply will contain details about the reply message, as well as details of the message the reply was sent in response to, including any metadata specified. Every reply will have a reply ID to be used with the confirm replies endpoint.

*Note: The source number and destination number properties in a reply are the inverse of those specified in the message the reply is in response to. The source number of the reply message is the same as the destination number of the original message, and the destination number of the reply message is the same as the source number of the original message. If a source number wasn't specified in the original message, then the destination number property will not be present in the reply message.*

Subsequent requests to the check replies endpoint will return the same reply messages and a maximum of 100 replies will be returned in each request. Applications should use the confirm replies endpoint in the following pattern so that replies that have been processed are no longer returned in subsequent check replies requests. The expiry date for getting an entity is 45 days.

1. Call check replies endpoint
2. Process each reply message
3. Confirm all processed reply messages using the confirm replies endpoint

*Note: It is recommended to use the Webhooks feature to receive reply messages rather than polling the check replies endpoint.*

[← Replies](index.md)
