# Post detail report

Generates a report listing all sent and/or received messages within a specified time period.

| | |
|---|---|
| **Service** | [Messaging Reports](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v2-preview/reporting/messages/detail` |
| **Operation ID** | `PostDetailReport` |
| **Authentication** | Basic Auth or HMAC Auth |
| **Success** | `200` — A list of all messages received in the specified time window |
| **Request body** | Optional; `application/json` |

## Minimal request
```json
{
  "start_date": "2022-12-12T00:00:00.000z",
  "end_date": "2022-12-14T00:00:00.000z"
}
```

## Authentication

The operation declares these authentication alternatives (each item in the OpenAPI security array is an **OR** choice):

- **Basic Auth** (`basic_auth`): HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth** (`hmac_auth`): HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Base URLs

| Region | URL |
|--------|-----|
| EU | `https://eu.app.api.sinch.com` |
| APAC | `https://au.app.api.sinch.com` |

## Parameters

### Path parameters

None.

### Query parameters

None.

### Header parameters

None.

## Request body

- **Content-Type:** `application/json`
- **Required:** false

### detailrequest schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `start_date` | string | Yes | Start date time for report window. By default, the timezone for this parameter  will be taken from the account settings for the account associated with the  credentials used to make the request, or the account included in the Account parameter.  This can be overridden using the timezone parameter per request. The date must be in ISO8601 format. |  |
| `end_date` | string | Yes | End date time for report window. By default, the timezone for this parameter  will be taken from the account settings for the account associated with the  credentials used to make the request, or the account included in the Account parameter.  This can be overridden using the timezone parameter per request. The date must be in ISO8601 format, and after the requested start_date. |  |
| `direction` | string | No | The type of messages to include in the report. | Enum: `inbound`, `outbound`, `all` |
| `timezone` | string | No | The timezone of the messages to include, using the name of the region. |  |
| `source` | string | No | Filter results by source address. |  |
| `sources` | array of string | No | Filter results by multiple source addresses. This property overrides the `source` parameter. |  |
| `destination` | string | No | Filter results by destination address. |  |
| `destinations` | array of string | No | Filter results by multiple destination addresses. This property overrides the `destination` parameter. |  |
| `metadata_key` | string | No | Filter results for messages that include a metadata key. |  |
| `metadata_value` | string | No | Filter results for messages that include a metadata key containing this value. If this parameter is provided, the metadata_key parameter must also be provided. |  |
| `metadata_values` | array of string | No | Filter results for messages that include a metadata key containing these values. This parameter overrides the metadata_value property. If this parameter is provided, the metadata_key parameter must also be provided. |  |
| `accounts` | array of string | No | Filter results by a specific account. By default results will be returned for the account associated with the authentication credentials and all sub-accounts. |  |
| `status` | array of string | No | An array of message statuses |  |
| `opt_out` | boolean | No | Filter the report to only include messages that triggered an opt-out |  |
| `mms_media` | boolean | No | Filter results by mms media. |  |
| `message_format` | array of string | No | Format of message type. Deprecated — use the `channels` parameter instead, which provides equivalent and expanded message-type filtering. |  |
| `channels` | array of string | No | Filter the report by one or more channels. |  |
| `page` | integer | No | Page number for paging through paginated result sets. | Minimum: `0` |
| `page_size` | integer | No | Number of results to return in a page for paginated result sets. | Minimum: `1`; Maximum: `100` |

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | A list of all messages received in the specified time window | `detailresponse` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | `403response` |

### 200 response schema (`detailresponse`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `messages` | array of object | No |  |  |
| `pagination` | object | No |  |  |

#### `messages` item schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `message_id` | string (uuid) | No | Unique ID of this message |  |
| `format` | string | No | Filter results by message format, using enumerable MessageType. | Enum: `SMS`, `TTS`, `MMS` |
| `timestamp` | string | No | Timestamp of this message |  |
| `delivered_timestamp` | string | No | Time that this message was delivered |  |
| `last_status_update` | string | No | Last time this message's status was updated |  |
| `direction` | string | No | The type of messages to include in the report. | Enum: `inbound`, `outbound`, `all` |
| `status` | string | No | The status of the message | Enum: `undefined`, `queued`, `processing`, `processed`, `failed`, `scheduled`, `cancelled`, `delivered`, `expired`, `enroute`, `held`, `submitted`, `rejected`, `read` |
| `status_code` | number | No | The response code of the status |  |
| `status_description` | string | No | The status of the message |  |
| `source_address` | string | No |  |  |
| `destination_address` | string | No | Destination number of the message | Min length: `1`; Max length: `15` |
| `destination_address_country` | string | No | Country of the destination address |  |
| `source_address_country` | string | No | Country of the source address |  |
| `in_response_to` | string (uuid) | No | The ID of the message this message is a reply to, if any. |  |
| `action` | string | No | The action taken on the message, if any. |  |
| `media_url` | string | No | URL of the media attached to this message, if any (MMS/RCS). |  |
| `content` | string | No | Content of the message | Min length: `1`; Max length: `5000` |
| `account_id` | string | No | The ID of the account |  |
| `units` | number | No | The amount of messages received |  |
| `billing_category` | string | No | The billing category applied to this RCS message (e.g. RCS_BASIC, RCS_SINGLE, RCS_RICH, RCS_RICH_MEDIA). Supported from 5/Feb/2026. This field is only available for RCS messages and only for messages sent on or after this date. |  |
| `message_type` | string | No | The type of rich message. Supported from 09/Sep/2025, and this data is available only for reports starting from this date. | Enum: `TEXT_MESSAGE`, `MEDIA_MESSAGE`, `LOCATION_MESSAGE`, `CHOICE_RESPONSE_MESSAGE`, `MEDIA_CARD_MESSAGE`, `CARD_MESSAGE`, `CAROUSEL_MESSAGE`, `CHOICE_MESSAGE` |
| `metadata` | array of object | No | Metadata for the message as a list of key/value pairs. Each key can be up to 100 characters long and each value can be up to 256 characters long.<br>```<br>[<br>   {<br>      "key": "myKey",<br>      "value": "myValue"<br>   },<br>   {<br>      "key": "anotherKey",<br>      "value": "anotherValue"<br>   }<br>]<br>``` |  |

##### `metadata` item schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `key` | string | Yes |  |  |
| `value` | string | Yes |  |  |

#### `pagination` schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `page` | number | No |  |  |
| `page_size` | number | No |  |  |
| `has_next` | boolean | No |  |  |

### 400 response schema (`400response`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `message` | string | Yes |  |  |
| `details` | array of string | Yes | Additional error detail messages. |  |

### 401 response schema (`403response`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `message` | string | Yes |  |  |

## Examples

### cURL (minimal)

```bash
curl -X POST "https://eu.app.api.sinch.com/v2-preview/reporting/messages/detail" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
  "start_date": "2022-12-12T00:00:00.000z",
  "end_date": "2022-12-14T00:00:00.000z"
}'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v2-preview/reporting/messages/detail", {
  "method": "POST",
  "headers": {
    "Authorization": "Basic BASE64_ENCODED_CREDENTIALS",
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  "body": JSON.stringify({
  "start_date": "2022-12-12T00:00:00.000z",
  "end_date": "2022-12-14T00:00:00.000z"
})
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

const result = response.status === 204 ? null : await response.json();
console.log(result);
```

## Error handling

- **400**: Bad Request
- **401**: Unauthorized

## Related endpoints

- [Post insight report](post-insight-report.md)
- [Metadata Keys](post-metadata-keys.md)

## Specification details

Generates a report listing all sent and/or received messages within a specified time period.

**Request body description:** Request body.

[← Messaging Reports](index.md)
