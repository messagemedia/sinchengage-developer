# Get async report download URL

Returns a temporary pre-signed URL for downloading the generated report. The URL allows customers to securely download the report file directly using the provided reportId.

| | |
|---|---|
| **Service** | [Messaging Reports](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/reports/{reportId}/download-url` |
| **Operation ID** | `GetAsyncReportDownloadUrl` |
| **Authentication** | Basic Auth or HMAC Auth or Bearer JWT |
| **Success** | `200` — A pre-signed URL for downloading the report. |
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

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `reportId` | string (uuid) | Yes | The ID of the report to download. |  |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | A pre-signed URL for downloading the report. | `presignedurlresponse` |
| 401 | No valid authentication details were provided | None |
| 404 | Report not found. | `404response` |

### 200 response schema (`presignedurlresponse`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `download_url` | string | No | The pre-signed URL for downloading the report file. |  |
| `file_name` | string | No | The filename of the report CSV. |  |
| `file_size` | integer (int64) | No | The size of the report file in bytes. |  |
| `expires_in_seconds` | integer | No | The number of seconds until the pre-signed URL expires. |  |
| `expires_at` | integer (int64) | No | Unix timestamp (seconds) when the pre-signed URL expires. |  |

### 404 response schema (`404response`)

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `message` | string | Yes |  |  |

## Examples

### cURL (minimal)

```bash
curl -X GET "https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/reports/51f0097f-90b2-4a59-ad88-a0fd93abaa82/download-url" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v2-preview/reporting/messages/async/reports/51f0097f-90b2-4a59-ad88-a0fd93abaa82/download-url", {
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

- **401**: No valid authentication details were provided
- **404**: Report not found.

## Related endpoints

- [Post async detail report](post-async-detail-report.md)
- [Post async summary report](post-async-summary-report.md)
- [Get async detail fields](get-async-detail-fields.md)

## Specification details

Returns a temporary pre-signed URL for downloading the generated report. The URL allows customers to securely download the report file directly using the provided reportId.

[← Messaging Reports](index.md)
