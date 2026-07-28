# Create webhook

Create a webhook for one or more of the specified events.

A webhook would typically have the following structure:

```
{
  "url": "http://webhook.com",
  "method": "POST",
  "encoding": "JSON",
  "headers": {
    "Account": "DeveloperPortal7000"
  },
  "events": [
    "ENROUTE_DR",
    "DELIVERED_DR"
  ],
  "template": "{\"id\":\"$mtId\",\"status\":\"$statusCode\"}",
  "read_timeout": 5000,
  "retries": 3,
  "retry_delay": 30
}
```

A valid webhook must consist of the following properties:

- ```url``` The configured URL which will trigger the webhook when a selected event occurs.

- ```method``` The methods to map CRUD (create, retrieve, update, delete) operations to HTTP requests.

- ```encoding``` Webhooks can be delivered using different content types. You can choose from ```JSON```, ```FORM_ENCODED``` or ```XML```. This will automatically add the Content-Type header for you so you don't have to add it again in the `headers` property.

- ```headers``` HTTP header fields which provide required information about the request or response, or about the object sent in the message body. This should NOT include the `Content-Type` header.

- ```events``` Event or events that will trigger the webhook. At least one event should be present.

- ```template``` The structure of the payload that will be returned. You can format this in JSON or XML.

- ```read_timeout``` (Optional) The read timeout for the call to the Webhook in milliseconds. Set to 20000 by default, max 60000.

- ```retries``` (Optional) The number of times to retry a failed Webhook call.

- ```retry_delay``` (Optional) The delay period between retries in seconds. Minimum of 5, max 60.

#### Types of Events

You can select all of the events (listed below) or combine them in whatever way you like but at least one event must be used. Otherwise, the webhook won't be created.

A webhook will be triggered when any one or more of the events occur:

+ **SMS** 
  + `RECEIVED_SMS` Receive an SMS
  + `OPT_OUT_SMS` Opt-out occurred
+ **MMS**
  + `RECEIVED_MMS` Receive an MMS
+ **DR (Delivery Reports)**
  + `ENROUTE_DR` Message is enroute
  + `EXPIRED_DR` Message has expired
  + `REJECTED_DR` Message is rejected
  + `FAILED_DR` Message has failed
  + `DELIVERED_DR` Message is delivered
  + `SUBMITTED_DR` Message is submitted

#### Template Parameters

You can choose what to include in the data that will be sent as the payload via the Webhook. It's up to you to choose what format you would like the payload to be returned. You can choose between JSON or XML.

Keep in mind, if you've chosen JSON as the format, you must escape the JSON in the template value (see example above).

The table illustrates a list of all the parameters that can be included in the template and which event types it can be applied to.

| Data  | Parameter Name | Example | Event Type |
|:--|--|--|--:|
| **Service Type**  | $format, $type *- `$type` will be deprecated in the future; use `$format` instead*| `SMS` | `DR` `MO` `MO MMS` |
| **Message ID**  | $mtId, $messageId| `877c19ef-fa2e-4cec-827a-e1df9b5509f7` | `DR` `MO` `MO MMS`|
| **Delivery Report ID** |$drId, $reportId| `01e1fa0a-6e27-4945-9cdb-18644b4de043` | `DR` |
| **Reply ID**| $moId, $replyId| `a175e797-2b54-468b-9850-41a3eab32f74` | `MO` `MO MMS` |
| **Account ID**  | $accountId| `DeveloperPortal7000` | `DR` `MO` `MO MMS` |
| **Message Timestamp**  | $submittedTimestamp| `2016-12-07T08:43:00.850Z` | `DR` `MO` `MO MMS` |
| **Provider Timestamp**  | $receivedTimestamp| `2016-12-07T08:44:00.850Z` | `DR` `MO` `MO MMS` |
| **Message Status** | $status| `enroute` | `DR` |
| **Status Code**  | $statusCode| `200` | `DR` |
| **External Metadata** | $metadata.get('key')| `name` | `DR` `MO` `MO MMS` |
| **Source Address**| $sourceAddress| `+61491570156` | `DR` `MO` `MO MMS` |
| **Destination Address**| $destinationAddress| `+61491593156` | `MO` `MO MMS` |
| **Message Content**| $mtContent, $messageContent, $esc.json($!mtContent) *- when used in `JSON` encoded `template`*| `Hi Derp` | `DR` `MO` `MO MMS` |
| **Reply Content**| $moContent, $replyContent, $esc.json($!moContent) *- when used in `JSON` encoded `template`*| `Hello Derpina` | `MO` `MO MMS` |
| **Retry Count**| $retryCount| `1` | `DR` `MO` `MO MMS` |
| **Billing Unit**| $billingUnits| `1` | `DR` |
| **Attachments**| $attachments, refer to example below on how to use in `JSON` encoded `template`| <code>[<br>  {<br>    "content_type": "image/png",<br>    "content": "...",<br>    "original_name": "file.png"<br>  }<br>]</code> | `MO MMS` |

#### Example Webhook Request with Templates

##### MO / MO MMS

```
{
  "url": "http://webhook.com",
  "method": "POST",
  "encoding": "JSON",
  "events": ["RECEIVED_MMS"],
  "template": "{  \"account_id\": \"$accountId\",  \"reply_id\": \"$replyId\",  \"destination_number\": \"$destinationAddress\",  \"source_number\": \"$sourceAddress\",  \"date_received\": \"$receivedTimestamp\",  \"message_id\": \"$messageId\",  #if ($attachments)  \"attachments\": [   #foreach ($entry in $attachments)    {      \"content_type\": \"$entry.contentType\",      \"content\": \"$entry.base64\",      \"original_name\": \"$entry.originalName\"    }#if( $foreach.hasNext ),#end    #end  ],  #else  \"content\": \"$esc.json($moContent)\",  #end  \"metadata\": {    #foreach ($entry in $metadata.entrySet())    \"$entry.key\": \"$entry.value\"#if( $foreach.hasNext ),#end    #end  }}"
}
```

##### DR (Delivery Report)

```
{
  "url": "http://webhook.com",
  "method": "POST",
  "encoding": "JSON",
  "events": ["DELIVERED_DR"],
  "template": "{  \"delivery_report_id\": \"$drId\",  \"source_number\": \"$sourceAddress\",  \"date_received\": \"$receivedTimestamp\",  \"status\": \"$status\",  \"delay\": \"0\",  \"submitted_date\": \"$submittedTimestamp\",  \"message_id\": \"$messageId\",  \"original_text\": \"$esc.json($!mtContent)\",  \"vendor_account_id\": {    \"vendor_id\": \"$vendorId\",    \"account_id\": \"$accountId\"  },  \"error_code\": \"$statusCode\",  \"metadata\": {    #foreach($key in $metadata.keySet())    \"$key\": \"$esc.json($metadata.get($key))\"#if( $velocityHasNext ),#end    #end  }}"
}
```

#### Message Statuses

Delivery Reports indicate message status. A message can have one of the following statuses:

* `enroute`: Message has been received by the gateway and is being processed (or waiting to be processed).

* `submitted`: Message has been submitted to a provider/carrier for delivery.

* `delivered`: Message delivery has been confirmed by the provider, including to the handset (where possible).

* `expired`: The message has expired.

* `rejected`: The message will not be delivered - permanent failure. Reasons may include usage limit exceeded, insufficient credit, number blocked, or content filtered

* `failed`: The message has failed. Reasons may include no active routes to destination or undeliverable by downstream provider.

#### Message Status Codes

Status codes provide more granular insight into a message's status. A message can have one of the following status codes:

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

*Note: A 400 response will be returned if the `url` is invalid, the `events`, `encoding` or `method` is null or the `headers` has a Content-Type attribute.*

| | |
|---|---|
| **Service** | [Webhooks Management](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/webhooks/messages` |
| **Operation ID** | `CreateWebhook` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports the following schemes:

- **Basic Auth** (`basic_auth`): HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth** (`hmac_auth`): HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

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
| `url` | `string` | Yes | The configured URL which will trigger the webhook when a selected event occurs. |
| `method` | `string` | Yes | HTTP method used when invoking the webhook. |
| `encoding` | `string` | Yes | Delivery content type: `JSON`, `FORM_ENCODED`, or `XML`. |
| `headers` | `object` ([Headers](#headers)) | Yes | HTTP header fields for the webhook request. Must not include `Content-Type`. |
| `events` | `array` of `string` | Yes | Webhook event types to subscribe to. At least one event is required. |
| `template` | `string` | Yes | Structure of the payload returned by the webhook (JSON or XML string). |
| `read_timeout` | `integer` | No | The read timeout for the webhook call in milliseconds. Default: `20000`. Maximum: `60000`. |
| `retries` | `integer` | No | The number of times to retry a failed webhook call. |
| `retry_delay` | `integer` | No | The delay between retries in seconds. Minimum: `5`. Maximum: `60`. |

### Headers

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `Account` | `string` | No | Example: `DeveloperPortal7000` |

### Example request body

```json
{
  "url": "http://webhook.com",
  "method": "POST",
  "encoding": "JSON",
  "headers": {
    "Account": "DeveloperPortal7000"
  },
  "events": [
    "ENROUTE_DR",
    "DELIVERED_DR"
  ],
  "template": "{\"id\":\"$mtId\",\"status\":\"$statusCode\"}",
  "read_timeout": 5000,
  "retries": 3,
  "retry_delay": 30
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| `201` | Webhook successfully created | [CreateWebhookresponse](#201-response-schema) |
| `400` | Unexpected error in API call. See HTTP response body for details. | [Error response](#400-response-schema) |
| `401` | No valid authentication details were provided | — |
| `409` | Unexpected error in API call. See HTTP response body for details. | [Conflict response](#409-response-schema) |

### 201 response schema

The created webhook object. Only `id`, `url`, and `method` are required; the remaining fields echo back the created configuration.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` (`uuid`) | Yes | Unique identifier for the webhook. |
| `url` | `string` | Yes | The configured URL which will trigger the webhook when a selected event occurs. |
| `method` | `string` | Yes | HTTP method used when invoking the webhook. |
| `encoding` | `string` | No | Delivery content type: `JSON`, `FORM_ENCODED`, or `XML`. |
| `headers` | `object` ([Headers](#headers)) | No | HTTP header fields for the webhook request. |
| `events` | `array` of `string` | No | Webhook event types subscribed to. |
| `template` | `string` | No | Structure of the payload returned by the webhook (JSON or XML string). |
| `read_timeout` | `integer` | No | The read timeout for the webhook call in milliseconds. |
| `retries` | `integer` | No | The number of times to retry a failed webhook call. |
| `retry_delay` | `integer` | No | The delay between retries in seconds. |

#### Example

```json
{
  "id": "76fa7010-8c1f-4a24-917a-4d62a54e744d",
  "url": "http://webhook.com",
  "method": "POST",
  "encoding": "JSON",
  "headers": {
    "Account": "DeveloperPortal7000"
  },
  "events": [
    "ENROUTE_DR",
    "DELIVERED_DR"
  ],
  "template": "{\"id\":\"$mtId\",\"status\":\"$statusCode\"}",
  "read_timeout": 5000,
  "retries": 3,
  "retry_delay": 30
}
```

### 400 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | `string` | Yes | Error message. |

#### Example

```json
{
  "message": "Something went wrong. Please try again later."
}
```

### 409 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | `string` | Yes | Error message. |

#### Example

```json
{
  "message": "A webhook with the given url and method already exists."
}
```

## Examples

### cURL

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/webhooks/messages" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic Base64(api_key:api_secret)" \
  -d '{
    "url": "http://webhook.com",
    "method": "POST",
    "encoding": "JSON",
    "headers": {
      "Account": "DeveloperPortal7000"
    },
    "events": [
      "ENROUTE_DR",
      "DELIVERED_DR"
    ],
    "template": "{\"id\":\"$mtId\",\"status\":\"$statusCode\"}",
    "read_timeout": 5000,
    "retries": 3,
    "retry_delay": 30
  }'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/webhooks/messages", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa("api_key:api_secret"),
  },
  body: JSON.stringify({
    url: "http://webhook.com",
    method: "POST",
    encoding: "JSON",
    headers: {
      Account: "DeveloperPortal7000",
    },
    events: ["ENROUTE_DR", "DELIVERED_DR"],
    template: '{"id":"$mtId","status":"$statusCode"}',
    read_timeout: 5000,
    retries: 3,
    retry_delay: 30,
  }),
});

const data = await response.json();
```

## Error handling

- **`400`**: Returned if the `url` is invalid, the `events`, `encoding` or `method` is null, or the `headers` object includes a `Content-Type` attribute. Body includes a `message` string.
- **`401`**: No valid authentication details were provided.
- **`409`**: A webhook with the given URL and method already exists. Body includes a `message` string (for example, `A webhook with the given url and method already exists.`).

## Related endpoints

- [Retrieve webhook](retrieve-webhook.md)
- [Update webhook](update-webhook.md)
- [Delete webhook](delete-webhook.md)

[← Webhooks Management](index.md)
