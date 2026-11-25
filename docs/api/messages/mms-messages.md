# MMS messages

| | |
|---|---|
| **Service** | [Messages](index.md) |
| **Endpoint** | [Send messages](send-messages.md) `POST /v1/messages` |
| **`format`** | `MMS` |

MMS is a text message with a subject and media. It is sent with [Send messages](send-messages.md) (`POST /v1/messages`). Set `format` to `MMS`; MMS is never inferred, so `media` without `format: "MMS"` is rejected with 400.

### Fields

| Field | Required | Notes |
|---|---|---|
| `destination_number` | **Yes** | E.164 format, for example `+61491570156`. |
| `format` | **Yes** | `MMS`. |
| `content` | **Yes** | Message text, 1–5,000 characters. |
| `media` | Optional | List of publicly reachable URLs. Supported formats: png, jpeg and gif. |
| `subject` | Optional | Up to 64 characters. |
| `source_number` | Optional | Sender: a number or alpha tag registered to your account. Omit to use the account default. |
| `source_number_type` | Optional | `INTERNATIONAL`, `ALPHANUMERIC` or `SHORTCODE`. Only with `source_number`. |
| `callback_url` | Optional | URL that receives delivery-report and reply webhooks for this message. |
| `delivery_report` | Optional | `true` to request delivery reports. Default `false`. |
| `scheduled` | Optional | Future send time, ISO 8601 UTC. |
| `message_expiry_timestamp` | Optional | Latest delivery time, ISO 8601 UTC. Undelivered messages are discarded after it. |
| `metadata` | Optional | Up to 10 key/value pairs (key ≤ 100 chars, value ≤ 256 chars), returned with delivery reports and replies. |
| `fallback_message` | Not accepted (400) | Not supported for this message type. |
| `suggestions` | Not accepted (400) | Not supported for this message type. |
| `rich_content` | Not accepted (400) | Not supported for this message type. |

### Minimal request

```json
{
  "messages": [
    {
      "format": "MMS",
      "content": "Here is your event ticket.",
      "destination_number": "+61491570156",
      "subject": "Your ticket",
      "media": [
        "https://cdn.example.com/ticket.png"
      ]
    }
  ]
}
```

### Limits and errors

- 400 if `format` is not `MMS` when `media` or `subject` is present.
- 400 if `content` is missing, empty or over 5,000 characters.
- 400 if a field that MMS does not accept is present.
- Up to 100 messages per request. One invalid message rejects the whole request and nothing is sent.

### cURL

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/messages" \
  -u "YOUR_API_KEY:YOUR_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
  "messages": [
    {
      "format": "MMS",
      "content": "Here is your event ticket.",
      "destination_number": "+61491570156",
      "subject": "Your ticket",
      "media": [
        "https://cdn.example.com/ticket.png"
      ]
    }
  ]
}'
```

Use the base URL for your region (see [Base URLs](index.md#base-urls)).

[← Messages](index.md)
