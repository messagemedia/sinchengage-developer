# SMS messages

| | |
|---|---|
| **Service** | [Messages](index.md) |
| **Endpoint** | [Send messages](send-messages.md) `POST /v1/messages` |
| **`format`** | `SMS`, or omitted |

SMS is the default text message type. It is sent with [Send messages](send-messages.md) (`POST /v1/messages`). Set `format` to `SMS`, or omit `format` when the message has no `rich_content` or `suggestions`.

### Fields

| Field | Required | Notes |
|---|---|---|
| `destination_number` | **Yes** | E.164 format, for example `+61491570156`. |
| `format` | Optional | `SMS`, or omit. |
| `content` | **Yes** | Message text, 1–5,000 characters (Unicode). |
| `source_number` | Optional | Sender: a number or alpha tag registered to your account. Omit to use the account default. |
| `source_number_type` | Optional | `INTERNATIONAL`, `ALPHANUMERIC` or `SHORTCODE`. Only with `source_number`. |
| `callback_url` | Optional | URL that receives delivery-report and reply webhooks for this message. |
| `delivery_report` | Optional | `true` to request delivery reports. Default `false`. |
| `scheduled` | Optional | Future send time, ISO 8601 UTC. |
| `message_expiry_timestamp` | Optional | Latest delivery time, ISO 8601 UTC. Undelivered messages are discarded after it. |
| `metadata` | Optional | Up to 10 key/value pairs (key ≤ 100 chars, value ≤ 256 chars), returned with delivery reports and replies. |
| `media` | Not accepted (400) | Not supported for this message type. |
| `subject` | Not accepted (400) | Not supported for this message type. |
| `fallback_message` | Not accepted (400) | Not supported for this message type. |
| `suggestions` | Not accepted (400) | Not supported for this message type. |
| `rich_content` | Not accepted (400) | Not supported for this message type. |

With `format` omitted, `rich_content` or `suggestions` switch the message to RCS instead (see [RCS messages](rcs-messages.md)).

### Minimal request

```json
{
  "messages": [
    {
      "content": "Your appointment is confirmed for Tuesday at 10am.",
      "destination_number": "+61491570156"
    }
  ]
}
```

### With delivery options

```json
{
  "messages": [
    {
      "format": "SMS",
      "content": "Your appointment is confirmed for Tuesday at 10am.",
      "destination_number": "+61491570156",
      "source_number": "+61491570157",
      "source_number_type": "INTERNATIONAL",
      "callback_url": "https://example.com/webhooks/messages",
      "delivery_report": true,
      "scheduled": "2027-03-01T09:00:00Z",
      "message_expiry_timestamp": "2027-03-01T12:00:00Z",
      "metadata": {
        "order_id": "1234",
        "team": "support"
      }
    }
  ]
}
```

### Limits and errors

- 400 if `content` is missing, empty or over 5,000 characters.
- 400 if a field that SMS does not accept is present.
- Up to 100 messages per request. One invalid message rejects the whole request and nothing is sent.

### cURL

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/messages" \
  -u "YOUR_API_KEY:YOUR_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
  "messages": [
    {
      "content": "Your appointment is confirmed for Tuesday at 10am.",
      "destination_number": "+61491570156"
    }
  ]
}'
```

Use the base URL for your region (see [Base URLs](index.md#base-urls)).

[← Messages](index.md)
