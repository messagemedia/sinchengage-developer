# Get async report history

Returns a list of asynchronous reports that have been requested by the current account.

| | |
|---|---|
| **Service** | [Messaging Reports](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/reports` |
| **Operation ID** | `GetAsyncReportHistory` |
| **Authentication** | Basic Auth or HMAC Auth or Bearer JWT |
| **Success** | `200` — A list of async reports for the current account. |
| **Request body** | None |

## Minimal request
This operation has no request body.

## Authentication

The operation declares these authentication alternatives (each item in the OpenAPI security array is an **OR** choice):

- **Basic Auth** (`basic_auth`): HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth** (`hmac_auth`): HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.
- **Bearer JWT** (`bearer_auth`): Bearer JWT authentication used by selected messaging-reports async download endpoints. Prefer Basic or HMAC for all other operations.

## Base URLs

| Region | URL |
|--------|-----|
| EU | `https://eu.app.api.sinch.com` |
| APAC | `https://au.app.api.sinch.com` |

## Parameters

### Path parameters

None.

### Query parameters

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `page_size` | integer | No | The number of items to return per page. |  |
| `page_token` | string | No | A pagination token returned from a previous call. Pass this to retrieve the next page of results. |  |
| `report_name` | string | No | Filter results by report name. |  |
| `status` | array of string | No | Filter results by report status. Multiple statuses can be specified. |  |
| `start_date` | string (date-time) | No | Filter reports requested on or after this date (ISO 8601). |  |
| `end_date` | string (date-time) | No | Filter reports requested on or before this date (ISO 8601). |  |
| `sort_direction` | string | No | Sort direction for the results. | Enum: `ASCENDING`, `DESCENDING` |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | A list of async reports for the current account. | `reporthistoryresponses` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | `403response` |

### 200 response schema (`reporthistoryresponses`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `items` | array of object | No | A list of report history items. |  |
| `next_page_token` | string | No | A token to retrieve the next page of results. Absent if there are no more pages. |  |

#### `items` item schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `report_id` | string (uuid) | No | Unique identifier for the report. |  |
| `report_name` | string | No | The name of the report. |  |
| `report_type` | string | No | The type of the report. | Enum: `DETAIL`, `SUMMARY` |
| `direction` | string | No | The type of messages to include in the report. | Enum: `inbound`, `outbound`, `all` |
| `requested_by` | string | No | The UUID of the user who requested the report. |  |
| `requested_at` | string (date-time) | No | The date and time when the report was requested (ISO 8601). |  |
| `updated_at` | string (date-time) | No | The date and time when the report was last updated (ISO 8601). |  |
| `status` | string | No | The current status of the report. | Enum: `REQUESTED`, `RUNNING`, `FAILED`, `CANCELLED`, `DONE` |
| `account_id` | string | No | The account ID associated with the report. |  |
| `vendor_id` | string | No | The vendor ID associated with the report. |  |
| `s3_file_size` | integer (int64) | No | The size of the report file in bytes. |  |
| `request_data` | object | No | The original report request parameters that were submitted, as an echo of the request body/query used to generate this report. |  |

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
curl -X GET "https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/reports" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/reports", {
  "method": "GET",
  "headers": {
    "Authorization": "Basic BASE64_ENCODED_CREDENTIALS",
    "Accept": "application/json"
  }
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

- [Post async detail report](post-async-detail-report.md)
- [Post async summary report](post-async-summary-report.md)
- [Get async detail fields](get-async-detail-fields.md)

## Specification details

Returns a list of asynchronous reports that have been requested by the current account.

[← Messaging Reports](index.md)
