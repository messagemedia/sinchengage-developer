# Delete scheduled report by id

Deletes a scheduled report by providing its id.

| | |
|---|---|
| **Service** | [Messaging Reports](index.md) |
| **Method** | `DELETE` |
| **URL** | `https://eu.app.api.sinch.com/v2-preview/reporting/scheduled/{id}` |
| **Operation ID** | `DeleteScheduledReport` |
| **Authentication** | Basic Auth or HMAC Auth |
| **Success** | `202` — An empty response indicating the report has been deleted. |
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

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `id` | string | Yes | The ID of the scheduled report to delete. |  |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 202 | An empty response indicating the report has been deleted. | None |
| 401 | No valid authentication details were provided | None |
| 404 | Scheduled report not found. | None |

## Examples

### cURL (minimal)

```bash
curl -X DELETE "https://eu.app.api.sinch.com/v2-preview/reporting/scheduled/e6fb8282-c7c3-4367-8590-6c77ddb11c3e" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v2-preview/reporting/scheduled/e6fb8282-c7c3-4367-8590-6c77ddb11c3e", {
  "method": "DELETE",
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
- **404**: Scheduled report not found.

## Related endpoints

- [Scheduled detail report](detailscheduledreport.md)
- [Scheduled summary report](summaryscheduledreport.md)
- [Update a scheduled detail report](updatedetailscheduledreport.md)

## Specification details

Deletes a scheduled report by providing its id.

[← Messaging Reports](index.md)
