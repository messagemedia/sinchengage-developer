# Short Trackable Links Reports

Short Trackable Links is a feature available to [Messaging API](https://support.app.sinch.com/hc/en-us/categories/10516535548943-Sinch-Engage-Developer-Guides) users whereby it automatically and seamlessly shortens any URL to just 22 characters. Every shortened URL is unique to each recipient.

The reporting API has endpoints specific to this feature, allowing users to obtain details regarding the number of click-throughs on each URL.

To enable this feature on your account, contact your account manager or contact support on [support@app.sinch.com](mailto:support@app.sinch.com).

To learn more about the benefits of the Short Trackable Links feature, [visit our feature page](https://support.app.sinch.com/hc/en-us/articles/10525004171919-Short-Trackable-Links-URL-shortener).

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com` |
| APAC instance | `https://au.app.api.sinch.com` |

## Choose an endpoint

| Goal | Endpoint |
|------|----------|
| Inspect click and view events for one short URL hash | [Log detail](log-detail.md) |
| Aggregate short URL activity using optional metadata, URL, or recipient filters | [Log summary](log-summary.md) |

Use **Log summary** to discover aggregate activity and matching short URLs. Use **Log detail** when you have a short URL `hash` and need its individual click and view events.

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Log detail](log-detail.md) | `GET` | `/v1/reporting/links/detail` | Log detail |
| [Log summary](log-summary.md) | `GET` | `/v1/reporting/links/summary` | Log summary |

[← All services](../index.md)
