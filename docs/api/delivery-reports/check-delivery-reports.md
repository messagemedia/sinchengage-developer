# Check delivery reports

Return unconfirmed delivery reports for the account (newest status changes not yet confirmed). Max 100 per response. Same reports repeat until confirmed. Prefer [Webhooks](../webhooks-management/index.md) over polling when possible. Retention: 45 days.

| | |
|---|---|
| **Service** | [Delivery Reports](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/delivery_reports` |
| **Operation ID** | `CheckDeliveryReports` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — Unconfirmed reports |
| **Required** | None (no path, query, or body parameters) |

### Poll pattern

1. Call this endpoint.
2. Process each `delivery_reports[]` item.
3. Confirm IDs with [Confirm delivery reports as received](confirm-delivery-reports-as-received.md).

### Example success body

```json
{
  "delivery_reports": [
    {
      "callback_url": "https://my.callback.url.com",
      "delivery_report_id": "01e1fa0a-6e27-4945-9cdb-18644b4de043",
      "source_number": "+61491570157",
      "date_received": "2017-05-20T06:30:37.642Z",
      "status": "enroute",
      "delay": 0,
      "billing_units": 1,
      "submitted_date": "2017-05-20T06:30:37.639Z",
      "original_text": "My first message!",
      "message_id": "d781dcab-d9d8-4fb2-9e03-872f07ae94ba",
      "vendor_account_id": {
        "vendor_id": "SinchEU",
        "account_id": "MyAccount"
      },
      "metadata": {
        "key1": "value1",
        "key2": "value2"
      }
    }
  ]
}
```

Note: In a delivery report, `source_number` is the destination of the original outbound message (addresses are inverted relative to send).

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
| 200 | Unconfirmed reports | `Checkdeliveryreportsresponse` |
| 401 | Unauthorized | `403response` |
| 404 | Resource not found | `404response` |

### 200 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `delivery_reports` | array | No | The oldest 100 unconfirmed delivery reports. Min items: 0. Max items: 100. |

#### `delivery_reports` item schema (`DeliveryReport`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `callback_url` | string | No | The URL specified as the callback URL in the original submit message request |
| `date_received` | string (date-time) | No | The date and time at which this delivery report was generated in UTC. |
| `delay` | integer (int32) | No | Deprecated, no longer in use. Deprecated. |
| `billing_units` | integer (int32) | No | The billing units of this report |
| `delivery_report_id` | string (uuid) | No | Unique ID for this delivery report |
| `message_id` | string (uuid) | No | Unique ID of the original message |
| `metadata` | object | No | Any metadata that was included in the original submit message request |
| `original_text` | string | No | Text of the original message. |
| `source_number` | string | No | Address from which this delivery report was received. Min length: 1. Max length: 15. |
| `status` | string | No | The status of the message. Enum: `undefined`, `queued`, `processing`, `processed`, `failed`, `scheduled`, `cancelled`, `delivered`, `expired`, `enroute`, `held`, `submitted`, `rejected`, `read` |
| `submitted_date` | string (date-time) | No | The date and time when the message status changed in UTC. For a delivered DR this may indicate the time at which the message was received on the handset. |
| `vendor_account_id` | object | No | |

##### `vendor_account_id` schema (`VendorAccountId`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `vendor_id` | string | No | |
| `account_id` | string | No | The account used to submit the original message. |

Notes for implementers:

- Callback push payloads in the service overview may include `error_code`; that field is **not** declared on the `DeliveryReport` schema returned by this polling endpoint.
- Status meanings and error codes for push notifications are documented under [Delivery Reports → Specification details](index.md#specification-details).

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
curl -X GET "https://eu.app.api.sinch.com/v1/delivery_reports" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/delivery_reports", {
  method: "GET",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});

const result = await response.json();
console.log(result.delivery_reports);
```

## Error handling

- **401 Unauthorized**: Unauthorized. Verify Basic or HMAC credentials on the request.
- **404 Not Found**: Resource not found.

## Related endpoints

- [Confirm delivery reports as received](confirm-delivery-reports-as-received.md)
- [Send messages](../messages/send-messages.md)

## Specification details

Check for any delivery reports that have been received.

Delivery reports are a notification of the change in status of a message as it is being processed.

Each request to the check delivery reports endpoint will return any delivery reports received that have not yet been confirmed using the confirm delivery reports endpoint. A response from the check delivery reports endpoint will have the following structure:

```json
{
    "delivery_reports": [
        {
            "callback_url": "https://my.callback.url.com",
            "delivery_report_id": "01e1fa0a-6e27-4945-9cdb-18644b4de043",
            "source_number": "+61491570157",
            "date_received": "2017-05-20T06:30:37.642Z",
            "status": "enroute",
            "delay": 0,
            "billing_units": 1,
            "submitted_date": "2017-05-20T06:30:37.639Z",
            "original_text": "My first message!",
            "message_id": "d781dcab-d9d8-4fb2-9e03-872f07ae94ba",
            "vendor_account_id": {
                "vendor_id": "SinchEU",
                "account_id": "MyAccount"
            },
            "metadata": {
                "key1": "value1",
                "key2": "value2"
            }
        },
        {
            "callback_url": "https://my.callback.url.com",
            "delivery_report_id": "0edf9022-7ccc-43e6-acab-480e93e98c1b",
            "source_number": "+61491570158",
            "date_received": "2017-05-21T01:46:42.579Z",
            "status": "enroute",
            "delay": 0,
            "billing_units": 1,
            "submitted_date": "2017-05-21T01:46:42.574Z",
            "original_text": "My second message!",
            "message_id": "fbb3b3f5-b702-4d8b-ab44-65b2ee39a281",
            "vendor_account_id": {
                "vendor_id": "SinchEU",
                "account_id": "MyAccount"
            },
            "metadata": {
                "key1": "value1",
                "key2": "value2"
            }
        }
    ]
}
```

Each delivery report will contain details about the message, including any metadata specified and the new status of the message (as each delivery report indicates a change in status of a message) and the timestamp at which the status changed. Every delivery report will have a unique delivery report ID for use with the confirm delivery reports endpoint.

*Note: The source number and destination number properties in a delivery report are the inverse of those specified in the message that the delivery report relates to. The source number of the delivery report is the destination number of the original message.*

Subsequent requests to the check delivery reports endpoint will return the same delivery reports and a maximum of 100 delivery reports will be returned in each request. Applications should use the confirm delivery reports endpoint in the following pattern so that delivery reports that have been processed are no longer returned in subsequent check delivery reports requests. The expiry date for getting an entity is 45 days.

1. Call check delivery reports endpoint
2. Process each delivery report
3. Confirm all processed delivery reports using the confirm delivery reports endpoint

*Note: It is recommended to use the Webhooks feature to receive reply messages rather than polling the check delivery reports endpoint.*

[← Delivery Reports](index.md)
