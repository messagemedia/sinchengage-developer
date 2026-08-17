# Get async detail report status

Retrieves the status of a detail report.

| | |
|---|---|
| **Service** | [Messaging Reports](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/status` |
| **Operation ID** | `GetAsyncDetailStatus` |
| **Authentication** | Basic Auth or HMAC Auth |
| **Success** | `200` — The status of the requested detail report. |
| **Request body** | None |

## Minimal request
This operation has no request body.

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

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `report_id` | string | Yes | The ID of the detail report to retrieve. |  |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | The status of the requested detail report. | `reportstatusresponse` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | `403response` |

### 200 response schema (`reportstatusresponse`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `report_status` | string | No |  | Enum: `REQUESTED`, `RUNNING`, `FAILED`, `CANCELLED`, `DONE` |

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
curl -X GET "https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/status?report_id=abc" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/status?report_id=abc", {
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

Retrieves the status of a detail report.

[← Messaging Reports](index.md)
