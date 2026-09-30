# Webhooks Management

Webhooks Management API allows you to manage your webhooks configuration. You can subscribe to one or several events, retrieve the webhooks, update them or even delete them if needed. An account can have at most 150 webhooks. Creating another webhook is rejected with HTTP 400 when the account already has 150 or more.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com` |
| APAC instance | `https://au.app.api.sinch.com` |
| US instance | `https://us.app.api.sinch.com` |

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Create webhook](create-webhook.md) | `POST` | `/v1/webhooks/messages` | Create a webhook for one or more of the specified events |
| [Retrieve webhook](retrieve-webhook.md) | `GET` | `/v1/webhooks/messages` | Retrieve all the webhooks created for the connected account |
| [Update webhook](update-webhook.md) | `PATCH` | `/v1/webhooks/messages/{webhookId}` | Update a webhook |
| [Delete webhook](delete-webhook.md) | `DELETE` | `/v1/webhooks/messages/{webhookId}` | Delete a webhook that was previously created for the connected account |

[← All services](../index.md)
