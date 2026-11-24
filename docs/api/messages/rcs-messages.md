# RCS messages

| | |
|---|---|
| **Service** | [Messages](index.md) |
| **Endpoint** | [Send messages](send-messages.md) `POST /v1/messages` |
| **`format`** | `RCS`, or omitted with `rich_content` or `suggestions` |

RCS sends rich, interactive messages: text with suggestion buttons, media, cards, carousels and location pins. It is sent with [Send messages](send-messages.md) (`POST /v1/messages`). Set `format` to `RCS`, or omit `format` and include `rich_content` or `suggestions` to select RCS. Your account must be enabled for RCS (402 otherwise).

### Fields

| Field | Required | Notes |
|---|---|---|
| `destination_number` | **Yes** | E.164 format, for example `+61491570156`. |
| `format` | Optional | `RCS`, or omit when `rich_content` or `suggestions` is present. |
| `content` | Conditional | Text message, 1–2,000 characters. Required for text and for `suggestions`. Omit when sending `rich_content` (400 with explicit `format: "RCS"`; dropped when `format` is omitted). |
| `suggestions` | Optional | Up to 10 tappable buttons under `content`. Types: `reply`, `url`, `dial`, `location`. |
| `rich_content` | Optional | Exactly one of `media`, `card`, `carousel`, `location`. Sent instead of `content`. |
| `fallback_message` | Optional | `{ "content": "..." }` (1–5,000 characters) sent as SMS when the recipient can't receive RCS. Without it, the send is RCS-or-nothing. |
| `source_number` | Optional | Sender of the SMS `fallback_message` only; not used without `fallback_message`. Must be a number or alpha tag registered to your account. |
| `source_number_type` | Accepted, not used | `INTERNATIONAL`, `ALPHANUMERIC` or `SHORTCODE`. Accepted but not used. |
| `callback_url` | Optional | URL that receives delivery-report and reply webhooks for this message. |
| `delivery_report` | Optional | `true` to request delivery reports. Default `false`. |
| `scheduled` | Optional | Future send time, ISO 8601 UTC. |
| `message_expiry_timestamp` | Optional | Latest delivery time, ISO 8601 UTC. Undelivered messages are discarded after it. |
| `metadata` | Optional | Up to 10 key/value pairs (key ≤ 100 chars, value ≤ 256 chars), returned with delivery reports and replies. |
| `media` | Not accepted (400) | Not supported for this message type. |
| `subject` | Not accepted (400) | Not supported for this message type. |

### Minimal request

```json
{
  "messages": [
    {
      "format": "RCS",
      "content": "Hello from our RCS channel!",
      "destination_number": "+61491570156"
    }
  ]
}
```

### Text with SMS fallback

Plain RCS text. If the recipient can't receive RCS, `fallback_message` is sent as SMS.

```json
{
  "messages": [
    {
      "format": "RCS",
      "content": "Hello from our RCS channel!",
      "destination_number": "+61491570156",
      "source_number": "+61491570157",
      "fallback_message": {
        "content": "Hello from us!"
      }
    }
  ]
}
```

### Text with suggestions

Text with up to 10 tappable suggestions: `reply`, `url`, `dial` and `location`.

```json
{
  "messages": [
    {
      "format": "RCS",
      "content": "Need help with your order?",
      "destination_number": "+61491570156",
      "suggestions": [
        {
          "type": "reply",
          "text": "Talk to support",
          "postback_data": "SUPPORT"
        },
        {
          "type": "url",
          "text": "View help",
          "url": "https://example.com/help"
        },
        {
          "type": "dial",
          "text": "Call us",
          "phone_number": "+61291570100"
        },
        {
          "type": "location",
          "text": "Find us",
          "coordinates": {
            "latitude": -33.8688,
            "longitude": 151.2093
          },
          "label": "Sydney office"
        }
      ]
    }
  ]
}
```

### Media

A single image, video, audio or PDF file (type detected from the URL) sent as `rich_content.media`.

```json
{
  "messages": [
    {
      "format": "RCS",
      "destination_number": "+61491570156",
      "rich_content": {
        "media": {
          "url": "https://cdn.example.com/welcome.png",
          "thumbnail_url": "https://cdn.example.com/welcome_thumb.png",
          "filename_override": "welcome.png"
        }
      },
      "fallback_message": {
        "content": "Welcome! View our latest update at https://example.com/news"
      }
    }
  ]
}
```

### Rich card

A card with a title, description, media and up to 4 suggestions.

```json
{
  "messages": [
    {
      "format": "RCS",
      "destination_number": "+61491570156",
      "rich_content": {
        "card": {
          "title": "Order #1234 shipped",
          "description": "Estimated delivery: Friday",
          "height": "MEDIUM",
          "media": {
            "url": "https://cdn.example.com/parcel.png"
          },
          "suggestions": [
            {
              "type": "reply",
              "text": "Track",
              "postback_data": "TRACK_1234"
            },
            {
              "type": "url",
              "text": "View order",
              "url": "https://example.com/orders/1234"
            }
          ]
        }
      },
      "fallback_message": {
        "content": "Your order #1234 has shipped"
      }
    }
  ]
}
```

### Carousel

1–10 cards, with up to 3 choices shown below the carousel.

```json
{
  "messages": [
    {
      "format": "RCS",
      "destination_number": "+61491570156",
      "rich_content": {
        "carousel": {
          "cards": [
            {
              "title": "Order #1234 Shipped",
              "description": "Estimated delivery: Friday",
              "height": "MEDIUM",
              "media": {
                "url": "https://cdn.example.com/parcel.png"
              },
              "suggestions": [
                {
                  "type": "reply",
                  "text": "Track",
                  "postback_data": "TRACK_1234"
                },
                {
                  "type": "url",
                  "text": "View order",
                  "url": "https://example.com/orders/1234"
                }
              ]
            },
            {
              "title": "Order #5678 Out for delivery",
              "description": "Arriving today",
              "height": "MEDIUM",
              "suggestions": [
                {
                  "type": "reply",
                  "text": "Track",
                  "postback_data": "TRACK_5678"
                }
              ]
            }
          ],
          "choices": [
            {
              "type": "reply",
              "text": "All orders",
              "postback_data": "ALL_ORDERS"
            }
          ]
        }
      },
      "fallback_message": {
        "content": "Your orders are on their way"
      }
    }
  ]
}
```

### Location pin

A map pin sent as `rich_content.location`.

```json
{
  "messages": [
    {
      "format": "RCS",
      "destination_number": "+61491570156",
      "rich_content": {
        "location": {
          "coordinates": {
            "latitude": -33.8688,
            "longitude": 151.2093
          },
          "title": "Sydney office",
          "label": "Reception, level 2"
        }
      },
      "fallback_message": {
        "content": "Find us at our Sydney office"
      }
    }
  ]
}
```

### Channel selection

The `format` field is optional. When omitted the channel is inferred from the payload:

| # | `format` | Rich content present (`rich_content` or `suggestions`) | `content` present | Outcome |
|---|----------|-------------------------------------------------------|-------------------|---------|
| T1 | omitted | ✓ | ✓ | Sent as RCS. With `suggestions`, `content` is the text the suggestions sit under. With `rich_content`, `content` is dropped (see note). |
| T2 | omitted | ✓ | ✗ | Sent as RCS (`rich_content` satisfies sendable-content; `suggestions`-only rejected with 400) |
| T3 | omitted | ✗ | ✓ | Sent as SMS |
| T4 | omitted | ✗ | ✗ | 400 — no sendable content |
| T5 | SMS | ✓ | ✓ | 400 — rich content incompatible with explicit SMS |
| T6 | SMS | ✓ | ✗ | 400 — rich content incompatible with explicit SMS |
| T7 | SMS | ✗ | ✓ | Sent as SMS |
| T8 | SMS | ✗ | ✗ | 400 — no sendable content |

**Request-time errors** are returned immediately, and no messages in the batch are sent: 400 for T4–T6 and T8, and 402 Payment Required when the message is sent as RCS (explicit or inferred) and the account isn't enabled for RCS. **Delivery-report failures** (recipient not RCS-capable) are reported asynchronously in the delivery report, not as a request-time error.

`content` with `rich_content` (T1): when `format` is omitted, the message is sent as RCS using `rich_content` only. `content` is dropped: it isn't sent, isn't returned on the 202 response or by Get message status, and isn't used as an SMS fallback. Add `fallback_message` to send an SMS when the recipient can't receive RCS. With explicit `format: "RCS"`, sending both `content` and `rich_content` is rejected with 400.

`fallback_message` never selects the channel and does not satisfy `content`. With explicit `format: "SMS"`, `fallback_message` is rejected with 400, as it isn't part of an SMS message.

### Limits and errors

- `content` up to 2,000 characters.
- `suggestions` up to 10; text up to 25 characters, URL up to 2,048 characters.
- Card `title` up to 200 characters, `description` up to 2,000; up to 4 suggestions per card.
- Carousel: 1–10 cards, up to 3 choices.
- Location `label` up to 1,000 characters.
- Exactly one `rich_content` type per message.
- `suggestions` without `content` returns 400.
- 402 when the account is not enabled for RCS.
- A recipient that isn't RCS-capable is reported in the delivery report, not at request time.
- Up to 100 messages per request. One invalid message rejects the whole request and nothing is sent.

### cURL

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/messages" \
  -u "YOUR_API_KEY:YOUR_API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
  "messages": [
    {
      "format": "RCS",
      "content": "Hello from our RCS channel!",
      "destination_number": "+61491570156"
    }
  ]
}'
```

Use the base URL for your region (see [Base URLs](index.md#base-urls)).

[← Messages](index.md)
