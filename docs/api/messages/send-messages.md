# Send messages

Submit one or more (up to 100 per request) SMS, MMS, text-to-speech, or RCS messages for delivery.

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
      "content": "My first message!",
      "destination_number": "+61491570156"
    }
  ]
}
```

On success, each returned message includes `message_id` (UUID) and `status` (`queued`). Use [Get message status](get-message-status.md) to poll later. If any message in the batch is invalid, **no** messages are sent.

### Plain RCS text with SMS fallback

Set `format` to `RCS` and provide `content`. `fallback_message` is optional:

```json
{
  "messages": [
    {
      "content": "Hello from our RCS channel!",
      "destination_number": "+61491570156",
      "format": "RCS",
      "fallback_message": {
        "content": "Hello from us!"
      },
      "source_number": "MyBrand",
      "source_number_type": "ALPHANUMERIC"
    }
  ]
}
```

The account must be enabled for RCS. Otherwise the request returns `402 Payment Required`; contact your account manager to enable it.

`fallback_message` never selects a channel. An explicit `format: "RCS"` send is attempted over RCS. If the recipient cannot receive RCS, the API sends `fallback_message.content` as SMS. `source_number` and `source_number_type` identify the SMS fallback sender only. If `fallback_message` is omitted, the send is RCS-or-nothing: no SMS is sent silently, and the outcome is reported asynchronously in the delivery report rather than as a request error.

### RCS text with tappable suggestions

Add up to 10 `suggestions` to a plain RCS text message. Each suggestion needs a `type` and a `text` label of up to 25 characters:

```json
{
  "messages": [
    {
      "content": "Need help with your order?",
      "destination_number": "+61491570156",
      "format": "RCS",
      "suggestions": [
        { "type": "reply", "text": "Talk to support", "postback_data": "SUPPORT" },
        { "type": "url", "text": "View help", "url": "https://example.com/help" },
        { "type": "dial", "text": "Call us", "phone_number": "+61391570100" },
        {
          "type": "location",
          "text": "Find store",
          "coordinates": { "latitude": -37.8136, "longitude": 144.9631 },
          "label": "Melbourne CBD"
        }
      ]
    }
  ]
}
```

| `type` | Required fields | Optional fields |
|--------|-----------------|-----------------|
| `reply` | `text` | `postback_data` |
| `url` | `text`, `url` (max 2048 characters) | `postback_data` |
| `dial` | `text`, `phone_number` | `postback_data` |
| `location` | `text`, `coordinates` (both `latitude` and `longitude`) | `label` (max 1000 characters), `postback_data` |

The `202` response and [Get message status](get-message-status.md) echo `content` and `suggestions` in the order you sent them, including `postback_data`. Fields that do not apply to a suggestion's `type`, such as `url` on a `reply`, are ignored and not returned. An empty `suggestions` array sends plain RCS text.

A request with a missing required field, more than 10 suggestions, or a `text` longer than 25 characters is rejected with `400`, and no messages in the batch are sent. Any other `type`, including `calendar`, is also rejected with `400`, with the generic detail `Failed to parse message body.`

`suggestions` can be combined with `fallback_message`; the SMS fallback is plain text and does not include the suggestions. When the recipient taps a suggestion, the tap arrives through the existing replies flow without `postback_data`.

### RCS rich media

To send an image or file over RCS, set `format` to `RCS` and provide `rich_content.media` instead of `content`. `fallback_message` is optional:

```json
{
  "messages": [
    {
      "destination_number": "+61491570156",
      "format": "RCS",
      "rich_content": {
        "media": {
          "url": "https://cdn.example.com/promo.png",
          "thumbnail_url": "https://cdn.example.com/promo_thumb.png",
          "filename_override": "promo.png"
        }
      },
      "fallback_message": {
        "content": "Check out our promo"
      },
      "source_number": "MyBrand",
      "source_number_type": "ALPHANUMERIC"
    }
  ]
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `rich_content.media.url` | Yes | `http` or `https` URL of the media file. |
| `rich_content.media.thumbnail_url` | No | `http` or `https` URL of a thumbnail image. |
| `rich_content.media.filename_override` | No | File name to use for the media instead of the one derived from `url`. |

The `202` response and [Get message status](get-message-status.md) echo `rich_content.media`; optional fields you did not send are not returned. `fallback_message`, `source_number`, and `source_number_type` behave as for plain RCS text: the fallback is sent as plain SMS text and does not include the media, and there is no MMS fallback.

The following are rejected with `400`, and no messages in the batch are sent:

| Request | Example detail |
|---------|----------------|
| `rich_content` together with non-blank `content` | `/messages/0/: content conflicts with rich_content` |
| `rich_content` together with `suggestions` | `/messages/0/: suggestions conflicts with rich_content` |
| `rich_content` without `media` | `/messages/0/: rich_content must include media` |
| Missing `url`, or `url` / `thumbnail_url` that is not a valid `http` or `https` URL | `url is required` / `Invalid url` |
| Any other field on `media`, such as `media_type` | `/messages/0/rich_content/media/media_type: Unknown property 'media_type'` |

The media file's type and reachability are not checked when you submit the message. If the file cannot be delivered, the outcome is reported asynchronously in the delivery report.

RCS delivery reports and replies appear in the account's existing `GET /v1/delivery-reports` and `GET /v1/replies` polling responses. Polling is account-scoped: an existing poller can receive RCS events after any client on that account starts sending RCS, and polling cannot be targeted or filtered per client. A per-message `callback_url` does not change that polling scope.

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
| `messages` | array | Yes | List of messages. |

### `messages` item schema (`Message`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `content` | string | Conditional | Required except on an RCS `rich_content` message. Max length: 5000, or 2000 for RCS text. |
| `destination_number` | string | Yes | Destination number of the message. Min length: 1. Max length: 15. |
| `callback_url` | string | No | URL replies and delivery reports to this message will be pushed to. Must use the `http` or `https` scheme. Hostnames must conform to RFC 1123 DNS name syntax. Paths must not contain whitespace or control characters. Invalid URLs are rejected with HTTP 400. |
| `delivery_report` | boolean | No | Request a delivery report for this message |
| `format` | string | No | Outbound message format. Enum: `SMS`, `TTS`, `MMS`, `RCS`. Defaults to SMS when omitted. |
| `fallback_message` | object | No | SMS fallback for an RCS message. Requires non-blank `content`, max 5000 characters. It never selects the channel. |
| `suggestions` | array | No | Up to 10 tappable suggestions (`reply`, `url`, `dial`, `location`) on an RCS text message. Not supported with `rich_content`. See [RCS text with tappable suggestions](#rcs-text-with-tappable-suggestions). |
| `rich_content` | object | Conditional | RCS rich content sent instead of `content`. Must include `media` with a `url`, and optionally `thumbnail_url` and `filename_override`. Not supported with `content` or `suggestions`. See [RCS rich media](#rcs-rich-media). |
| `message_expiry_timestamp` | string (date-time) | No | Date time after which the message expires and will not be sent |
| `metadata` | object | No | Metadata for the message specified as a set of key value pairs, each key can be up to 100 characters long and each value can be up to 256 characters long |
| `scheduled` | string (date-time) | No | Scheduled delivery date time of the message |
| `source_number` | string | No | SMS sender. On an RCS message it applies only to SMS fallback and is unused without `fallback_message`. |
| `source_number_type` | string | No | Type of source address specified, this can be INTERNATIONAL, ALPHANUMERIC or SHORTCODE. Enum: `INTERNATIONAL`, `ALPHANUMERIC`, `SHORTCODE` |
| `message_id` | string (uuid) | No | Unique ID of this message |
| `status` | string | No | The status of the message. Enum: `undefined`, `queued`, `processing`, `processed`, `failed`, `scheduled`, `cancelled`, `delivered`, `expired`, `enroute`, `held`, `submitted`, `rejected`, `read` |
| `media` | array of strings | No | The media is used to specify a list of URLs of the media file(s) that you are trying to send. Supported file formats include png, jpeg and gif. format parameter must be set to MMS for this to work. |
| `subject` | string | No | The subject field is used to denote subject of the MMS message and has a maximum size of 64 characters long |

Notes for implementers (schema cells above stay verbatim from the shared OpenAPI components):

- On **this** endpoint, `format` selects the outbound channel. Use `SMS` (default), `MMS`, `TTS`, or `RCS`.
- From 1-Mar-2024, an SMS `source_number` or sender ID must be registered to your account.
- `message_id` and `status` are response fields on the shared `Message` object. Do not send them on create; the API returns them.

### Example request body

```json
{
  "messages": [
    {
      "callback_url": "https://my.callback.url.com",
      "content": "My first message",
      "destination_number": "+61491570156",
      "delivery_report": true,
      "format": "SMS",
      "message_expiry_timestamp": "2016-11-03T11:49:02.807Z",
      "metadata": {
        "key1": "value1",
        "key2": "value2"
      },
      "scheduled": "2016-11-03T11:49:02.807Z",
      "source_number": "+61491570157",
      "source_number_type": "INTERNATIONAL"
    },
    {
      "callback_url": "https://my.callback.url.com",
      "content": "My second message",
      "destination_number": "+61491570158",
      "delivery_report": true,
      "format": "MMS",
      "subject": "This is an MMS message",
      "media": [
        "https://images.pexels.com/photos/1018350/pexels-photo-1018350.jpeg?cs=srgb&dl=architecture-buildings-city-1018350.jpg"
      ],
      "message_expiry_timestamp": "2016-11-03T11:49:02.807Z",
      "metadata": {
        "key1": "value1",
        "key2": "value2"
      },
      "scheduled": "2016-11-03T11:49:02.807Z",
      "source_number": "+61491570159",
      "source_number_type": "INTERNATIONAL"
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

Each item uses the same `Message` schema as the request. On success the API populates `message_id` (36-character UUID) and `status` (`queued` at submission). See the request `Message` table above — it is not repeated here.

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
curl -X POST "https://eu.app.api.sinch.com/v1/messages" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "messages": [
      {
        "content": "My first message!",
        "destination_number": "+61491570156"
      }
    ]
  }'
```

### cURL (full example from the spec)

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/messages" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "messages": [
      {
        "callback_url": "https://my.callback.url.com",
        "content": "My first message",
        "destination_number": "+61491570156",
        "delivery_report": true,
        "format": "SMS",
        "message_expiry_timestamp": "2016-11-03T11:49:02.807Z",
        "metadata": {
          "key1": "value1",
          "key2": "value2"
        },
        "scheduled": "2016-11-03T11:49:02.807Z",
        "source_number": "+61491570157",
        "source_number_type": "INTERNATIONAL"
      },
      {
        "callback_url": "https://my.callback.url.com",
        "content": "My second message",
        "destination_number": "+61491570158",
        "delivery_report": true,
        "format": "MMS",
        "subject": "This is an MMS message",
        "media": [
          "https://images.pexels.com/photos/1018350/pexels-photo-1018350.jpeg?cs=srgb&dl=architecture-buildings-city-1018350.jpg"
        ],
        "message_expiry_timestamp": "2016-11-03T11:49:02.807Z",
        "metadata": {
          "key1": "value1",
          "key2": "value2"
        },
        "scheduled": "2016-11-03T11:49:02.807Z",
        "source_number": "+61491570159",
        "source_number_type": "INTERNATIONAL"
      }
    ]
  }'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/messages", {
  method: "POST",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    messages: [
      {
        content: "My first message!",
        destination_number: "+61491570156"
      }
    ]
  })
});

const result = await response.json();
console.log(result.messages);
```

## Error handling

- **400 Bad Request**: Unexpected error in API call. See HTTP response body for details. Returned when the request fails to parse or message fields are invalid, including a malformed per-message `callback_url` (unsupported scheme, malformed hostname or DNS syntax, or path containing whitespace or control characters — e.g. `https://-invalid.com`, `https://invalid_.com`, `https:///path`, `https://:/path`, `http://.example.com`, `http://example..com`). If any message in a multi-message request is invalid, no messages are sent. Example detail: `"/messages/0/callbackUrl: Invalid callback url"`.
- **401 Unauthorized**: Unauthorized. Verify Basic or HMAC credentials on the request.
- The operation description also notes HTTP **422** for Singapore (+65) destinations when the client does not use TLS 1.3 or higher (IMDA). That status is not declared on this operation’s `responses` map.

## Related endpoints

- [Get message status](get-message-status.md)
- [Cancel scheduled message](cancel-scheduled-message.md)

## Specification details

Submit one or more (up to 100 per request) SMS, MMS, text to voice or RCS messages for delivery.

The most basic message has the following structure:

```json
{
    "messages": [
        {
            "content": "My first message!",
            "destination_number": "+61491570156"
        }
    ]
}
```

More advanced delivery features can be specified by setting the following properties in a message:

- `callback_url` A URL can be included with each message to which Webhooks will be pushed to via a HTTP POST request. Webhooks will be sent if and when the status of the message changes as it is processed (if the delivery report property of the request is set to `true`) and when replies are received. Specifying a callback URL is optional. When provided, the URL must use the `http` or `https` scheme, the hostname must conform to RFC 1123 DNS name syntax, and the path must not contain whitespace or control characters. Malformed values are rejected with HTTP 400. If any message in a multi-message request has an invalid `callback_url`, no messages are sent.

- `content` The content of the message. This can be a Unicode string, up to 5,000 characters long. Message content is required, except on an RCS message that sends `rich_content` instead.

- `rich_content` RCS only. Send an image or file as `rich_content.media` instead of `content`. See [RCS rich media](#rcs-rich-media).

- `delivery_report` Delivery reports can be requested with each message. If delivery reports are requested, a webhook will be submitted to the `callback_url` property specified for the message (or to the webhooks) specified for the account every time the status of the message changes as it is processed. The current status of the message can also be retrieved via the Delivery Reports endpoint of the Messages API. Delivery reports are optional and by default will not be requested.

- `destination_number` The destination number the message should be delivered to. This should be specified in E.164 international format. For information on E.164, please refer to http://en.wikipedia.org/wiki/E.164. A destination number is required.  
  ⚠️ IMDA TLS Compliance Notice: From 1 April 2026, all requests sending messages to Singapore (+65) numbers must use TLS 1.3 or higher. Requests using an older TLS version will be rejected with HTTP 422 Unprocessable Entity.

- `format` The format specifies which format the message will be sent as, `SMS` (text message), `MMS` (multimedia message), `TTS` (text to speech) or `RCS` (RCS message). With `TTS` format, we will call the destination number and read out the message using a computer generated voice. Specifying a format is optional, by default `SMS` will be used.

- `source_number_type` If a source number is specified, the type of source number may also be specified. This is recommended when using a source address type that is not an internationally formatted number, available options are `INTERNATIONAL`, `ALPHANUMERIC` or `SHORTCODE`. Specifying a source number type is only valid when the `source_number` parameter is specified and is optional. If a source number is specified and no source number type is specified, the source number type will be inferred from the source number, however this may be inaccurate.

- `source_number`[optional]  Specify a source number to be used.  Refer to the section below for more information on source numbers.  

  ⚠️ The number or sender ID must be registered to your account (from 1-Mar-2024).

  #### Source number (sender ID)

  There are several options for the number or sender ID that will show as the source of an outbound message. Some things to note:
  - If you do not specify a source number, the message will be sent with the default number for your account.
    - The default may be a number you have purchased from us - such as a dedicated number, a 10-digit longcode or toll-free number (US/CA), or a shortcode. Log into the web portal to manage your numbers.
    - If your account has multiple numbers, you can specify which source number to use in the request.
    - If your account does not have a number, your message may be sent using our shared number pool (in certain countries only)
  - `Alpha tag:` In some countries (AU, GB, some others), you may be able to send using an alpha tag - text that represents your brand of business.  Before using an alpha tag, you must register it in the Numbers section of the web portal.
  - `Other numbers:` You may use numbers that you own as the source number, but you must register them in the Numbers section of the web portal to confirm you have a right to use the number.
  If you need to register a large number of source numbers/sender IDs, consider using our [Source Address API](../source-address/index.md)

  ⚠️ If you specify a source_number that is not registered to your account, the message may fail to send, or may be sent with an alternative number.

- `media` The media is used to specify a list of URLs of the media file(s) that you are trying to send. Supported file formats include png, jpeg and gif. `format` parameter must be set to `MMS` for this to work.

- `subject` The subject field is used to denote subject of the MMS message and has a maximum size of 64 characters long. Specifying a subject is optional.

- `scheduled` A message can be scheduled for delivery in the future by setting the scheduled property. The scheduled property expects a date time specified in ISO 8601 format. The scheduled time must be provided in UTC and is optional. If no scheduled property is set, the message will be delivered immediately.

- `message_expiry_timestamp` A message expiry timestamp can be provided to specify the latest time at which the message should be delivered. If the message cannot be delivered before the specified message expiry timestamp elapses, the message will be discarded. Specifying a message expiry timestamp is optional.

- `metadata` Metadata can be included with the message which will then be included with any delivery reports or replies matched to the message. This can be used to create powerful two-way messaging applications without having to store persistent data in the application. Up to 10 key / value metadata data pairs can be specified in a message. Each key can be up to 100 characters long, and each value up to 256 characters long. Specifying metadata for a message is optional.

The response body of a successful POST request to the messages endpoint will include a `messages` property which contains a list of all messages submitted. The list of messages submitted will reflect the list of messages included in the request, but each message will also contain two new properties, `message_id` and `status`. The returned message ID will be a 36 character UUID which can be used to check the status of the message via the Get Message Status endpoint. The status of the message which reflect the status of the message at submission time which will always be `queued`. See the Delivery Reports section of this documentation for more information on message statuses.

*Note: when sending multiple messages in a request, all messages must be valid for the request to be successful. If any messages in the request are invalid, no messages will be sent.*

[← Messages](index.md)
