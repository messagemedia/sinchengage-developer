# Post async detail report

Generates an asynchronous report listing all sent and/or received messages within a specified time period.

| | |
|---|---|
| **Service** | [Messaging Reports](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/detail` |
| **Operation ID** | `PostAsyncDetailReport` |
| **Authentication** | Basic Auth or HMAC Auth |
| **Success** | `202` — A list of all messages received in the specified time window |
| **Request body** | Required; `application/json` |

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
- **Required:** true

### asyncsentmessagesdetailrequest schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `start_date` | string | Yes | Start date time for report window. By default, the timezone for this parameter will be taken from the account settings for the account associated with the credentials used to make the request, or the account included in the Account parameter. This can be overridden using the timezone parameter per request. The date must be in ISO8601 format. |  |
| `end_date` | string | Yes | End date time for report window. By default, the timezone for this parameter will be taken from the account settings for the account associated with the credentials used to make the request, or the account included in the Account parameter. This can be overridden using the timezone parameter per request. The date must be in ISO8601 format. |  |
| `timezone` | string | No | The timezone of the messages to include, using the name of the region. |  |
| `direction` | string | No | The type of messages to include in the report. | Enum: `inbound`, `outbound`, `all` |
| `source` | string | No | Filter results by source address. |  |
| `sources` | array of string | No | Filter results by multiple source addresses. This property overrides the `source` parameter. |  |
| `destination` | string | No | Filter results by destination address. |  |
| `destinations` | array of string | No | Filter results by multiple destination addresses. This property overrides the `destination` parameter. |  |
| `addresses` | array of string | No | Filter messages where source OR destination matches one of the provided values. This parameter can only be set when `direction` is `all` and cannot be used in the same request as the `source`, `destination`, `sources`, or `destinations` parameters. |  |
| `metadata_key` | string | No | Filter results for messages that include a metadata key. Can be used independently for searching. |  |
| `metadata_value` | string | No | Filter results for messages that include a metadata key containing this value. If this parameter is provided, the metadata_key parameter must also be provided. Cannot be used together with metadata_values. |  |
| `metadata_values` | array of string | No | Filter results for messages that include a metadata key containing these values. Must be used together with metadata_key. Cannot be used together with metadata_value. |  |
| `accounts` | array of string | No | Filter results by a specific account. By default results will be returned for the account associated with the authentication credentials and all sub-accounts. |  |
| `status` | array of string | No |  |  |
| `opt_out` | boolean | No | Filter the report to only include messages that triggered an opt-out |  |
| `message_format` | array of string | No | Format of message type. Deprecated — use the `channels` parameter instead, which provides equivalent and expanded message-type filtering. |  |
| `channels` | array of string | No | Filter the report by one or more channels. |  |
| `sort_by` | string | No | Field to sort results set by | Enum: `FORMAT`, `DIRECTION`, `STATUS`, `SOURCE_ADDRESS`, `DESTINATION_ADDRESS`, `STATUS_CODE`, `ACCOUNT_ID`, `DESTINATION_ADDRESS_COUNTRY`, `SOURCE_ADDRESS_COUNTRY`, `TIMESTAMP` |
| `sort_direction` | string | No | Order to sort results by. | Enum: `ASCENDING`, `DESCENDING` |
| `period` | string | No | Automatically set a date range based on the period value. Can't be combined with start_date and end_date. | Enum: `TODAY`, `YESTERDAY`, `THIS_WEEK`, `LAST_WEEK`, `THIS_MONTH`, `LAST_MONTH`, `LAST_30_DAYS`, `LAST_7_DAYS`, `THIS_WEEKDAYS`, `LAST_WEEKDAYS` |
| `include_contacts` | boolean | No | Whether to include contact details in the report. |  |
| `account_names` | array of object | No | A list of account label overrides for the accounts included in the report. |  |
| `label` | string | No | A label for this report. |  |
| `user_id` | string | No | The ID of the user requesting the report. |  |
| `is_support` | boolean | No | Whether the report is being requested by support on behalf of the account. |  |
| `report_type` | string | No | The type of report being requested. | Enum: `DETAIL`, `SUMMARY`, `USER_USAGE`, `SUB_ACCOUNT_USAGE`, `GENERIC` |
| `responded` | boolean | No | Filter results by whether the message received a response. |  |
| `fields` | array of object | No | Can be used for async detail report to select the fields to export csv files |  |
| `delivery_options` | array of object | No | A list of options to configure the delivery of the report. |  |

#### `account_names` item schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `account_id` | string | No |  |  |
| `label` | string | No |  |  |

#### `fields` item schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `name` | string | Yes | The `async/detail/fields` value from API. |  |
| `display_name` | string | Yes | Any string that you want to see in the CSV file header. |  |

#### `delivery_options` item schema

A delivery option

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `delivery_type` | string | No | How to deliver the report. | Enum: `EMAIL` |
| `delivery_addresses` | array of string | No | A list of email addresses to use as the recipient of the email. Only works for EMAIL delivery type |  |
| `delivery_format` | string | No | Format of the report. | Enum: `CSV` |

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 202 | A list of all messages received in the specified time window | `asyncreportresponse` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | `403response` |

### 202 response schema (`asyncreportresponse`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `report_id` | string | No | The ID of the returned report. |  |

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
curl -X POST "https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/detail" \
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
const response = await fetch("https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/detail", {
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

- [Post async summary report](post-async-summary-report.md)
- [Get async detail fields](get-async-detail-fields.md)
- [Get async detail report status](get-async-detail-status.md)

## Specification details

Generates an asynchronous report listing all sent and/or received messages within a specified time period.

**Request body description:** Request body.

[← Messaging Reports](index.md)
