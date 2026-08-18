# Scheduled detail report

Create scheduled report in detail containing total number of sent, received and billing units.

| | |
|---|---|
| **Service** | [Messaging Reports](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v2-preview/reporting/detail/scheduled` |
| **Operation ID** | `detailscheduledreport` |
| **Authentication** | Basic Auth or HMAC Auth |
| **Success** | `201` — A scheduled detail report received using the specified parameters. |
| **Request body** | Required; `application/json` |

## Minimal request
```json
{
  "label": "Weekly Report",
  "schedule": {
    "timezone": "UTC",
    "cron_expression": "0 0 * * * ? *",
    "type": "cron"
  },
  "report": {
    "period": "THIS_WEEK"
  }
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

### scheduleddetailreport schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `label` | string | Yes | The label of the report schedule |  |
| `schedule` | object | Yes | The time schedule of a scheduled report |  |
| `report` | object | Yes | A scheduled detail report request |  |
| `metadata` | array of object | No | Metadata for the message as a list of key/value pairs. Each key can be up to 100 characters long and each value can be up to 256 characters long.<br>```<br>[<br>   {<br>      "key": "myKey",<br>      "value": "myValue"<br>   },<br>   {<br>      "key": "anotherKey",<br>      "value": "anotherValue"<br>   }<br>]<br>``` |  |

#### `schedule` schema

The time schedule of a scheduled report

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `timezone` | string | Yes | The timezone of the report. |  |
| `cron_expression` | string | Yes | A string consisting of six or seven subexpressions that describe individual details of the schedule. |  |
| `type` | string | Yes |  |  |

#### `report` schema

A scheduled detail report request

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `period` | string | Yes | Automatically set a date range based on the period value. Can't be combined with start_date and end_date. | Enum: `TODAY`, `YESTERDAY`, `THIS_WEEK`, `LAST_WEEK`, `THIS_MONTH`, `LAST_MONTH`, `LAST_30_DAYS`, `LAST_7_DAYS`, `THIS_WEEKDAYS`, `LAST_WEEKDAYS` |
| `timezone` | string | No | The standard timezone name |  |
| `direction` | string | No | The type of messages to include in the report. | Enum: `inbound`, `outbound`, `all` |
| `source` | string | No | Filter results by source address. |  |
| `sources` | array of string | No | Filter results by multiple source addresses. This property overrides the `source` parameter. |  |
| `destination` | string | No | Filter results by destination address. |  |
| `destinations` | array of string | No | Filter results by multiple destination addresses. This property overrides the `destination` parameter. |  |
| `addresses` | array of string | No | Filter messages where source OR destination matches one of the provided values. This parameter can only be set when `direction` is `all` and cannot be used in the same request as the `source`, `destination`, `sources`, or `destinations` parameters. |  |
| `message_format` | array of string | No | Format of message type. Deprecated — use the `channels` parameter instead, which provides equivalent and expanded message-type filtering. |  |
| `channels` | array of string | No | Filter the report by one or more channels. |  |
| `metadata_key` | string | No | Filter results for messages that include a metadata key. |  |
| `metadata_value` | string | No | Filter results for messages that include a metadata key containing this value. If this parameter is provided, the metadata_key parameter must also be provided. |  |
| `accounts` | array of string | No | Filter results by a specific account. By default results will be returned for the account associated with the authentication credentials and all sub-accounts. |  |
| `status` | array of string | No | An array of message statuses. |  |
| `opt_out` | boolean | No | Filter the report to only include messages that triggered an opt-out |  |
| `delivery_options` | array of object | No | A list of options to configure the delivery of the report. |  |

##### `delivery_options` item schema

A delivery option

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `delivery_type` | string | No | How to deliver the report. | Enum: `EMAIL` |
| `delivery_addresses` | array of string | No | A list of email addresses to use as the recipient of the email. Only works for EMAIL delivery type |  |
| `delivery_format` | string | No | Format of the report. | Enum: `CSV` |

#### `metadata` item schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `key` | string | Yes |  |  |
| `value` | string | Yes |  |  |

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | A scheduled detail report received using the specified parameters. | `scheduledreportresponse` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | `403response` |

### 201 response schema (`scheduledreportresponse`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `scheduled_report_id` | string | No | The ID of the scheduled report. |  |

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
curl -X POST "https://eu.app.api.sinch.com/v2-preview/reporting/detail/scheduled" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
  "label": "Weekly Report",
  "schedule": {
    "timezone": "UTC",
    "cron_expression": "0 0 * * * ? *",
    "type": "cron"
  },
  "report": {
    "period": "THIS_WEEK"
  }
}'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v2-preview/reporting/detail/scheduled", {
  "method": "POST",
  "headers": {
    "Authorization": "Basic BASE64_ENCODED_CREDENTIALS",
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  "body": JSON.stringify({
  "label": "Weekly Report",
  "schedule": {
    "timezone": "UTC",
    "cron_expression": "0 0 * * * ? *",
    "type": "cron"
  },
  "report": {
    "period": "THIS_WEEK"
  }
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

- [Scheduled summary report](summaryscheduledreport.md)
- [Update a scheduled detail report](updatedetailscheduledreport.md)
- [Update a scheduled summary report](updatesummaryscheduledreport.md)

## Specification details

Create scheduled report in detail containing total number of sent, received and billing units.

**Request body description:** Request body.

[← Messaging Reports](index.md)
