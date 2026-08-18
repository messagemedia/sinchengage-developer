# Get async detail fields

Can be used for async detail report to select the fields to export csv files

| | |
|---|---|
| **Service** | [Messaging Reports](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/detail/fields` |
| **Operation ID** | `GetAsyncDetailFields` |
| **Authentication** | Basic Auth or HMAC Auth |
| **Success** | `200` — A list of selected fields to export csv files. |
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

### metakeyrequest schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `page` | number | No | Page number for paging through paginated result sets. |  |
| `page_size` | number | No | Number of results to return in a page for paginated result sets. |  |
| `start_date` | string | Yes | Start date time for report window. By default, the timezone for this parameter will be taken from the account settings for the account associated with the credentials used to make the request, or the account included in the Account parameter. This can be overridden using the timezone parameter per request. The date must be in ISO8601 format. |  |
| `end_date` | string | Yes | End date time for report window. By default, the timezone for this parameter will be taken from the account settings for the account associated with the credentials used to make the request, or the account included in the Account parameter. This can be overridden using the timezone parameter per request. The date must be in ISO8601 format. |  |
| `direction` | string | No | The type of messages to include in the report. | Enum: `inbound`, `outbound`, `all` |
| `accounts` | array of string | No | Filter results by a specific account. By default results will be returned for the account associated with the authentication credentials and all sub-accounts. |  |

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | A list of selected fields to export csv files. | `fieldsresponse` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | `403response` |

### 200 response schema (`fieldsresponse`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `fields` | array of string | No | An array of fields to be retrieved. |  |

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
curl -X POST "https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/detail/fields" \
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
const response = await fetch("https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/detail/fields", {
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

- [Post async detail report](post-async-detail-report.md)
- [Post async summary report](post-async-summary-report.md)
- [Get async detail report status](get-async-detail-status.md)

## Specification details

Can be used for async detail report to select the fields to export csv files

**Request body description:** Request body.

[← Messaging Reports](index.md)
