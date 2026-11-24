# Send messages

Submit one or more (up to 100 per request) SMS, MMS, text-to-speech (TTS) or RCS messages for delivery.

| | |
|---|---|
| **Service** | [Messages](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/messages` |
| **Operation ID** | `SendMessages` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `202` — Messages were accepted for processing |
| **Required body** | `messages[]` with `destination_number` and either `content` or RCS `rich_content` on each item |

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

### Message types

Every message needs `destination_number`. Choose the type with `format`, then add that type's fields. See [Example request bodies](#example-request-bodies) for a payload for each type.

| Type | `format` | Required | Type-specific fields | Reference |
|---|---|---|---|---|
| SMS | `SMS`, or omitted | `content` | — | [SMS messages](sms-messages.md) |
| MMS | `MMS` | `content` | `media`, `subject` | [MMS messages](mms-messages.md) |
| TTS | `TTS` | `content` | — | [Text-to-speech messages](text-to-speech-messages.md) |
| RCS | `RCS`, or omitted with `rich_content` or `suggestions` | `content` or `rich_content` | `suggestions`, `rich_content`, `fallback_message` | [RCS messages](rcs-messages.md) |

### Options for every type

- `callback_url`: URL that receives webhooks for this message: delivery reports (when `delivery_report` is `true`) and replies. It must use the `http` or `https` scheme, the hostname must conform to RFC 1123 DNS name syntax, and the path must not contain whitespace or control characters. A malformed value is rejected with `400` and no messages are sent.
- `delivery_report`: set to `true` to request delivery reports. Default `false`. You can also retrieve the current status with the Delivery Reports endpoints.
- `scheduled`: future send time, ISO 8601 in UTC. When omitted, the message is sent immediately.
- `message_expiry_timestamp`: latest delivery time, ISO 8601 in UTC. Undelivered messages are discarded after it.
- `metadata`: up to 10 key/value pairs (key up to 100 characters, value up to 256 characters), returned with delivery reports and replies.
- `source_number` / `source_number_type`: the sender. `source_number_type` is `INTERNATIONAL`, `ALPHANUMERIC` or `SHORTCODE`, is only valid with `source_number`, and is inferred from the number when omitted (which may be inaccurate). See the next section.

### Source number (sender ID)

The number or sender ID shown as the source of an outbound message.

- If you don't specify a source number, the message is sent from your account's default number. The default may be a number you have purchased, such as a dedicated number, a 10-digit longcode or toll-free number (US/CA), or a shortcode. Log in to the web portal to manage your numbers.
- If your account has multiple numbers, specify which one to use with `source_number`.
- If your account has no number, the message may be sent from our shared number pool (in certain countries only).
- **Alpha tag:** in some countries (AU, GB and others), you can send from an alpha tag that represents your brand or business. Register it in the Numbers section of the web portal before using it.
- **Other numbers:** you can use numbers that you own as the source number, but you must register them in the Numbers section of the web portal to confirm you have the right to use them.
- To register many source numbers or sender IDs, use the [Source Address API](../source-address/index.md).

⚠️ The number or sender ID must be registered to your account (from 1-Mar-2024).

⚠️ If you specify a `source_number` that isn't registered to your account, the message may fail to send, or may be sent from an alternative number.

### Response

A successful request returns `202` with a `messages` list that mirrors your request. Each message also has a `message_id` (a 36-character UUID) and a `status`, which is always `queued` at submission. Use `message_id` with [Get message status](get-message-status.md) to check progress.

### Batches

When you send multiple messages in one request, all messages must be valid for the request to succeed. If any message is invalid, no messages are sent.

⚠️ IMDA TLS compliance notice: from 1 April 2026, all requests sending messages to Singapore (+65) numbers must use TLS 1.3 or higher. Requests using an older TLS version are rejected with HTTP `422 Unprocessable Entity`.

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

- **Content-Type:** `application/json`
- **Required:** true

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `messages` | array | Yes | List of messages. Up to 100 per request. |

### `messages` item schema (`Message`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `content` | string | Conditional | Message text. Required for SMS, MMS, TTS and RCS text; omit when sending RCS `rich_content`. Min length: 1. Max length: 5000 (SMS, MMS, TTS) or 2000 (RCS). Not a substitute for `rich_content` or `suggestions` on an explicit `format: "SMS"` send (rejected with `400`). |
| `destination_number` | string | Yes | Destination number of the message. Min length: 1. Max length: 15. |
| `callback_url` | string | No | URL replies and delivery reports to this message will be pushed to. Must use the `http` or `https` scheme. Hostnames must conform to RFC 1123 DNS name syntax. Paths must not contain whitespace or control characters. Invalid URLs are rejected with HTTP 400. |
| `delivery_report` | boolean | No | Request a delivery report for this message |
| `format` | string | No | Outbound message channel. Optional: when omitted, the channel is inferred from the payload (`rich_content` or `suggestions` present: RCS; otherwise SMS). Setting `SMS` with `rich_content` or `suggestions` is rejected with `400`. Set `RCS` to force RCS without relying on inference. Enum: `SMS`, `TTS`, `MMS`, `RCS`. See [Channel selection](#channel-selection). |
| `fallback_message` | object | No | Optional SMS fallback for an RCS message: `{ "content": "..." }` (1–5000 characters). It never selects the channel. Rejected with `400` on an explicit `format: "SMS"` send. |
| `suggestions` | array | No | Up to 10 tappable suggestions (`reply`, `url`, `dial`, `location`) on an RCS text message. Requires `content`. Not supported with `rich_content`. See [RCS messages](rcs-messages.md). |
| `rich_content` | object | Conditional | RCS rich content sent instead of `content`. Include exactly one of `media`, `card`, `carousel`, or `location`. See [RCS messages](rcs-messages.md). |
| `message_expiry_timestamp` | string (date-time) | No | Date time after which the message expires and will not be sent |
| `metadata` | object | No | Metadata for the message specified as a set of key value pairs, each key can be up to 100 characters long and each value can be up to 256 characters long |
| `scheduled` | string (date-time) | No | Scheduled delivery date time of the message |
| `source_number` | string | No | Sender for the message: a number or alpha tag registered to your account. When omitted, your account's default number is used. On an RCS message, it's the sender of the SMS `fallback_message` and isn't used when `fallback_message` is omitted. |
| `source_number_type` | string | No | Type of source address specified, this can be INTERNATIONAL, ALPHANUMERIC or SHORTCODE. Enum: `INTERNATIONAL`, `ALPHANUMERIC`, `SHORTCODE` |
| `message_id` | string (uuid) | No | Unique ID of this message |
| `status` | string | No | The status of the message. Enum: `undefined`, `queued`, `processing`, `processed`, `failed`, `scheduled`, `cancelled`, `delivered`, `expired`, `enroute`, `held`, `submitted`, `rejected`, `read` |
| `media` | array of strings | No | MMS only. List of publicly reachable URLs of media files. Supported formats are png, jpeg and gif. Requires `format: "MMS"`. Rejected with `400` on SMS, TTS and RCS messages. |
| `subject` | string | No | MMS only. Subject of the message, up to 64 characters. Rejected with `400` on other message types. |

Notes for implementers:

- On this endpoint, `format` selects the outbound channel. When omitted, the channel is inferred. See [Channel selection](#channel-selection).
- From 1-Mar-2024, a `source_number` or sender ID must be registered to your account.
- `message_id` and `status` are response fields on the shared `Message` object. Do not send them on create; the API returns them.

## Example request bodies

Each example is a complete request body. Examples 1–4 are SMS, MMS and TTS, 5–11 are RCS, and 12 sends several types in one request.

### 1. SMS (`sms`)

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

### 2. SMS with delivery options (`smsWithOptions`)

```json
{
  "messages": [
    {
      "content": "Your appointment is confirmed for Tuesday at 10am.",
      "destination_number": "+61491570156",
      "format": "SMS",
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

### 3. MMS (`mms`)

```json
{
  "messages": [
    {
      "content": "Here is your event ticket.",
      "destination_number": "+61491570156",
      "format": "MMS",
      "subject": "Your ticket",
      "media": [
        "https://cdn.example.com/ticket.png"
      ]
    }
  ]
}
```

### 4. Text-to-speech (TTS) (`tts`)

```json
{
  "messages": [
    {
      "content": "Hello. Your appointment is confirmed for Tuesday at 10am. Goodbye.",
      "destination_number": "+61491570156",
      "format": "TTS"
    }
  ]
}
```

### 5. RCS text with SMS fallback (`rcsText`)

```json
{
  "messages": [
    {
      "content": "Hello from our RCS channel!",
      "destination_number": "+61491570156",
      "format": "RCS",
      "source_number": "+61491570157",
      "fallback_message": {
        "content": "Hello from us!"
      }
    }
  ]
}
```

### 6. RCS text with suggestions (`rcsSuggestions`)

```json
{
  "messages": [
    {
      "content": "Need help with your order?",
      "destination_number": "+61491570156",
      "format": "RCS",
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

### 7. RCS media (`rcsMedia`)

```json
{
  "messages": [
    {
      "destination_number": "+61491570156",
      "format": "RCS",
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

### 8. RCS rich card (`rcsCard`)

```json
{
  "messages": [
    {
      "destination_number": "+61491570156",
      "format": "RCS",
      "rich_content": {
        "card": {
          "title": "Order",
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
        "content": "Your order"
      }
    }
  ]
}
```

### 9. RCS carousel (`rcsCarousel`)

```json
{
  "messages": [
    {
      "destination_number": "+61491570156",
      "format": "RCS",
      "rich_content": {
        "carousel": {
          "cards": [
            {
              "title": "Order",
              "description": "Shipped",
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
              "title": "Order",
              "description": "Out for delivery",
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

### 10. RCS location pin (`rcsLocation`)

```json
{
  "messages": [
    {
      "destination_number": "+61491570156",
      "format": "RCS",
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

### 11. RCS without format (inferred from rich_content) (`rcsInferred`)

No `format` needed: `rich_content` selects RCS.

```json
{
  "messages": [
    {
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

### 12. Several messages in one request (`batch`)

```json
{
  "messages": [
    {
      "content": "Your appointment is confirmed for Tuesday at 10am.",
      "destination_number": "+61491570156",
      "format": "SMS"
    },
    {
      "content": "Here is your event ticket.",
      "destination_number": "+61491570157",
      "format": "MMS",
      "subject": "Your ticket",
      "media": [
        "https://cdn.example.com/ticket.png"
      ]
    },
    {
      "content": "Hello. Your appointment is confirmed for Tuesday at 10am. Goodbye.",
      "destination_number": "+61491570158",
      "format": "TTS"
    }
  ]
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 202 | Messages were accepted for processing | `Sendmessagesresponse` |
| 400 | Unexpected error in API call. See HTTP response body for details. | `400response` |
| 401 | Unauthorized | `403response` |
| 402 | Account is not enabled to send RCS. Contact your account manager. | `400response` |

### 202 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `messages` | array | No | List of messages. Max items: 100. |

Each item uses the same `Message` schema as the request. On success the API populates `message_id` (36-character UUID) and `status` (`queued` at submission). See the request `Message` table above; it is not repeated here.

### 400 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |
| `details` | array of strings | Yes | Additional error detail messages. |

### Example 400 responses

**Invalid destination number**

```json
{
  "message": "Request failed to parse correctly. Please ensure input is valid and try again.",
  "details": [
    "/messages/0/destination_number: International address must be between 8 and 15 characters excluding the first '+', International address contains invalid characters."
  ]
}
```

**Invalid callback URL**

```json
{
  "message": "Request failed to parse correctly. Please ensure input is valid and try again.",
  "details": [
    "/messages/0/callbackUrl: Invalid callback url"
  ]
}
```

**RCS `rich_content` combined with `content`**

```json
{
  "message": "Request failed to parse correctly. Please ensure input is valid and try again.",
  "details": [
    "/messages/0/: content conflicts with rich_content"
  ]
}
```

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

## Examples

### cURL (minimal)

```bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="YOUR_API_HOST" # Set YOUR_API_HOST to the regional host (for example https://eu.app.api.sinch.com)

# Minimal SMS. For MMS, TTS and RCS payloads, see the message type pages.
BODY=$(cat <<'EOF'
{
  "messages": [
    {
      "content": "Your appointment is confirmed for Tuesday at 10am.",
      "destination_number": "+61491570156"
    }
  ]
}
EOF
)

# HMAC authentication is also supported instead of Basic
BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X POST "${API_HOST}/v1/messages" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "${BODY}"
```

### JavaScript (fetch)

```javascript
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host (for example https://eu.app.api.sinch.com)

// Minimal SMS. For MMS, TTS and RCS payloads, see the message type pages.
const body = {
  "messages": [
    {
      "content": "Your appointment is confirmed for Tuesday at 10am.",
      "destination_number": "+61491570156"
    }
  ]
};

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/messages`, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

console.log(response.status);
console.log(await response.text());
```

## Error handling

- **400 Bad Request**: Unexpected error in API call. See HTTP response body for details. Returned when the request fails to parse or message fields are invalid, including a malformed per-message `callback_url` (unsupported scheme, malformed hostname or DNS syntax, or path containing whitespace or control characters). If any message in a multi-message request is invalid, no messages are sent. Example detail: `"/messages/0/callbackUrl: Invalid callback url"`.
- **401 Unauthorized**: Unauthorized. Verify Basic or HMAC credentials on the request.
- **402 Payment Required**: The account is not enabled to send RCS. Contact your account manager.
- The operation description also notes HTTP **422** for Singapore (+65) destinations when the client does not use TLS 1.3 or higher (IMDA). That status is not declared on this operation's `responses` map.

## Related endpoints

- [Get message status](get-message-status.md)
- [Cancel scheduled message](cancel-scheduled-message.md)

## Specification details

Source: `spec/paths/messages/v1_messages.yaml` (operation `SendMessages`). Message type references: [SMS messages](sms-messages.md), [MMS messages](mms-messages.md), [Text-to-speech messages](text-to-speech-messages.md), [RCS messages](rcs-messages.md).

[← Messages](index.md)
