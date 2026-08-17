# Post insight report

Create report summary containing total number of sent, received and billing units, using pre-calculated data to improve performance.

| | |
|---|---|
| **Service** | [Messaging Reports](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v2-preview/reporting/messages/insights` |
| **Operation ID** | `PostInsightReport` |
| **Authentication** | Basic Auth or HMAC Auth |
| **Success** | `200` — A list of all messages received in the specified time window |
| **Request body** | Optional; `application/json` |

## Minimal request
```json
{
  "start_date": "2022-12-12T01:01:01.001z",
  "end_date": "2022-12-14T01:01:01.001z",
  "timezone": "Australia/Sydney"
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

### insightsrequest schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `start_date` | string | Yes | Start date time for report window. By default, the timezone for this parameter will be taken from the account settings for the account associated with the credentials used to make the request, or the account included in the Account parameter. This can be overridden using the timezone parameter per request. The date must be in ISO8601 format and may include precise time values (e.g., milliseconds). |  |
| `end_date` | string | Yes | End date time for report window. By default, the timezone for this parameter will be taken from the account settings for the account associated with the credentials used to make the request, or the account included in the Account parameter. This can be overridden using the timezone parameter per request. The date must be in ISO8601 format, and after the requested start_date and may include precise time values (e.g., milliseconds). |  |
| `timezone` | string | Yes | The timezone of the messages to include, using the name of the region. |  |
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
| `status` | array of string | No | An array of message statuses. |  |
| `opt_out` | boolean | No | Filter the report to only include messages that triggered an opt-out |  |
| `channels` | array of string | No | Filter the report by one or more message channels. Supported from 14/Aug/2025, and filtering by channels is available only for reports starting from this date. |  |
| `group_by` | array of string | No | Defines available fields for grouping insights reports. COUNTRY and CHANNEL are supported from 14/Aug/2025, and POSTBACK_DATA is supported from 16/Sep/2025, with data available only from those dates onward. |  |

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | A list of all messages received in the specified time window | `insightsresponse` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | `403response` |

### 200 response schema (`insightsresponse`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `summaries` | array of object | No |  |  |
| `total_sent` | number | No |  |  |
| `total_received` | number | No |  |  |
| `total_billing_units` | number | No |  |  |
| `total_opt_out` | number | No |  |  |

#### `summaries` item schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `group` | string | No |  |  |
| `date` | string | No | One or more dates seperated by a comma, e.g. 2022-05-18,2022-05-19 |  |
| `total_sent` | number | No |  |  |
| `total_received` | number | No |  |  |
| `total_billing_units` | number | No |  |  |
| `total_opt_out` | number | No |  |  |
| `sub_groups` | array of object | No |  |  |

##### `sub_groups` item schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `date` | string | No | One or more dates separated by a comma, e.g. 2022-05-18,2022-05-19 |  |
| `group` | string | No |  |  |
| `total_sent` | number | No |  |  |
| `total_received` | number | No |  |  |
| `total_billing_units` | number | No |  |  |
| `total_opt_out` | number | No |  |  |

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
curl -X POST "https://eu.app.api.sinch.com/v2-preview/reporting/messages/insights" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
  "start_date": "2022-12-12T01:01:01.001z",
  "end_date": "2022-12-14T01:01:01.001z",
  "timezone": "Australia/Sydney"
}'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v2-preview/reporting/messages/insights", {
  "method": "POST",
  "headers": {
    "Authorization": "Basic BASE64_ENCODED_CREDENTIALS",
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  "body": JSON.stringify({
  "start_date": "2022-12-12T01:01:01.001z",
  "end_date": "2022-12-14T01:01:01.001z",
  "timezone": "Australia/Sydney"
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

- [Post detail report](post-detail-report.md)
- [Metadata Keys](post-metadata-keys.md)

## Specification details

Create report summary containing total number of sent, received and billing units, using pre-calculated data to improve performance.

**Request body description:** Request body.

[← Messaging Reports](index.md)
