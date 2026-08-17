# Replies

Endpoints for checking and confirming inbound message replies (MO) received by your account.

Polling returns unconfirmed replies (max 100). Prefer [Webhooks](../webhooks-management/index.md) over polling when possible. Entity retention is 45 days.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com` |
| APAC instance | `https://au.app.api.sinch.com` |

## Choose an endpoint

| Goal | Endpoint |
|------|----------|
| Fetch up to 100 unconfirmed replies | [Check replies](check-replies.md) |
| Mark processed reply IDs so they stop returning (up to 100 per call) | [Confirm replies as received](confirm-replies-as-received.md) |

Recommended poll pattern: check → process → confirm. Repeat until empty.

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Check replies](check-replies.md) | `GET` | `/v1/replies` | Check replies |
| [Confirm replies as received](confirm-replies-as-received.md) | `POST` | `/v1/replies/confirmed` | Confirm replies as received |

[← All services](../index.md)
