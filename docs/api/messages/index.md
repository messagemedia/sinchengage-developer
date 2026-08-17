# Messages

The Sinch Messages API provides a number of endpoints for building powerful two-way messaging applications. The Messages API provides access to three main resources:

* Messages - Messages delivered from an application to a handset.

* Delivery Reports - Real time reports on the delivery status of a message. As a message is processed, it's status may change several times before it is finally delivered to a handset.

* Replies - Messages sent from a handset to an application. These messages are typically a reply to a previously sent message.

![Message Flow](./message-flow.png)

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com/` |
| APAC instance | `https://au.app.api.sinch.com/` |

## Choose an endpoint

| Goal | Endpoint |
|------|----------|
| Submit SMS, MMS, or TTS for delivery (up to 100 per request) | [Send messages](send-messages.md) |
| Look up current status by `message_id` (retained 45 days) | [Get message status](get-message-status.md) |
| Cancel a message that is still `scheduled` | [Cancel scheduled message](cancel-scheduled-message.md) |

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Send messages](send-messages.md) | `POST` | `/v1/messages` | Send messages |
| [Get message status](get-message-status.md) | `GET` | `/v1/messages/{messageId}` | Get message status |
| [Cancel scheduled message](cancel-scheduled-message.md) | `PUT` | `/v1/messages/{messageId}` | Cancel scheduled message |

[← All services](../index.md)
