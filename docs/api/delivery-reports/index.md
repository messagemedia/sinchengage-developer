# Delivery Reports

If a callback URL is specified in the submit message request, then changes to the message status, replies received in response to the message or delivery reports received for the message will be pushed via a HTTP POST request. An alternative to delivery reports via a callback URL is custom webhooks using the [Webhooks Management](../webhooks-management/index.md) API.

Polling via the endpoints below is an alternative to push. Prefer webhooks when possible. Delivery reports may carry an additional charge; contact your Account Manager or Support (`support@app.sinch.com`). Entity retention is 45 days.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com/` |
| APAC instance | `https://au.app.api.sinch.com/` |

## Choose an endpoint

| Goal | Endpoint |
|------|----------|
| Fetch up to 100 unconfirmed delivery reports | [Check delivery reports](check-delivery-reports.md) |
| Mark processed report IDs so they stop returning (up to 100 per call) | [Confirm delivery reports as received](confirm-delivery-reports-as-received.md) |

Recommended poll pattern: check → process → confirm. Repeat until empty.

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Check delivery reports](check-delivery-reports.md) | `GET` | `/v1/delivery_reports` | Check delivery reports |
| [Confirm delivery reports as received](confirm-delivery-reports-as-received.md) | `POST` | `/v1/delivery_reports/confirmed` | Confirm delivery reports as received |

## Specification details

If a callback URL is specified in the submit message request, then changes to the message status, replies received in response to the message or delivery reports received for the message will be pushed via a HTTP POST request. An alternative to delivery reports via a callback URL is custom webhooks using the webhooks management API.

All notifications are JSON encoded and the request expects to receive a response in the HTTP 200 range. If a valid response isn't received the request will be retried in an exponentially backing off fashion.

Delivery Reports may carry an additional charge. For pricing, please contact your Account Manager or Support Team (<support@app.sinch.com>).

To include billing units in your delivery receipts via Webhooks, ensure that the switch "Enable billing units in Delivery Reports and Callbacks" is enabled in the API settings of your account.

For delivery reports or changes in the status of a message, the POST request to the specified URL will be as follows:

_Note, multiple delivery report notifications will be received for a single message._

```json
{
  "callback_url":"http://mockbin.org/bin/ac52ebd4-eca1-4c86-bf38-4dce79633906",
  "delivery_report_id":"693e87f2-a553-4281-9ffe-ddf04cbc4bf3",
  "source_number":"+61491570156",
  "date_received":"2016-11-03T11:49:02.807Z",
  "status":"delivered",
  "delay":0,
  "billing_units":1,
  "submitted_date":"2016-11-03T11:49:01.551Z",
  "original_text":"Hello world!",
  "message_id":"389dc1a8-62a4-4110-ba61-af94806c006f",
  "vendor_account_id":{
    "vendor_id":"SinchEU",
    "account_id":"MyAccount"
  },
  "error_code":"220",
  "metadata":{
    "key":"value"
  }
}
```

The properties included in the notification are as follows:

* **Callback URL**: The URL specified as the callback URL in the original submit message request.

* **Delivery Report ID**: A unique ID for the delivery report that this notification represents.

* **Source Number**: The destination address of the original message.

* **Date Received**: The date and time at which this notification was generated in UTC.

* **Status**: The status of the message as indicated by this delivery report. The status field can be one of the following values:

  * `enroute`: Message has been received by the gateway and is being processed (or waiting to be processed).
  * `submitted`: Message has been submitted to a provider/carrier for delivery.
  * `delivered`: Message delivery has been confirmed by the provider, including to the handset (where possible).
  * `expired`: The message has expired.
  * `rejected`: The message will not be delivered - permanent failure. Reasons may include usage limit exceeded, insufficient credit, number blocked, or content filtered
  * `failed`: The message has failed. Reasons may include no active routes to destination or undeliverable by downstream provider.

* **Delay**: _Deprecated, no longer in use_

* **Billing Units**: The number of billing units charged for the message.

* **Submitted Date**: Date time status of the message changed in UTC. For a delivered DR this may indicate the time at which the message was received on the handset.

* **Original Text**: Text of the original message.

* **Message ID**: ID of the original message.

* **Vendor Account ID**: The account used to submit the original message. The vendor will always be `SinchEU`

* **Error Code**: A status code which provides additional information about the message status:

  * `101`: Message being processed by the gateway.
  * `102`: Message is being rerouted to a different provider after failing via the first provider.
  * `151`: Message held for screening.
  * `200`: Message submitted to downstream provider for delivery.
  * `210`: Message accepted by downstream provider.
  * `211`: Message is enroute for delivery by provider.
  * `212`: Message submitted. Delivery pending.
  * `213`: Message scheduled for delivery by downstream provider.
  * `220`: Message delivered.
  * `221`: Message delivered to the handset.
  * `320`: Message validity period has expired (prior to submission).
  * `401`: Message validity period has expired (before delivery).
  * `301`: Usage threshold reached. Message discarded.
  * `302`: Destination address blocked. Message discarded.
  * `303`: Source address blocked. Message discarded.
  * `304`: Message dropped. Contact support.
  * `305`: Message discarded due to duplicate detection.
  * `402`: Message rejected by downstream provider.
  * `403`: Message skipped by downstream provider.
  * `410`: Invalid source address.
  * `411`: Invalid destination address.
  * `412`: Destination address blocked.
  * `413`: SMS service unavailable on destination.
  * `414`: Destination unreachable.
  * `330`: Gateway failure.
  * `331`: Message discarded.
  * `332`: No available route to destination.
  * `333`: Source address unsupported for this destination.
  * `400`: Message failed; undeliverable.
  * `405`: Message cancelled or deleted by provider.

[← All services](../index.md)
