# Log detail

Retrieve the individual click and view events recorded for a short trackable URL hash.

Detailed clicks report for a hashcode.

| | |
|---|---|
| **Service** | [Short Trackable Links Reports](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/reporting/links/detail` |
| **Operation ID** | `LogDetail` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — OK |
| **Required** | Query parameter: `hash` |

### Minimal request

```text
GET /v1/reporting/links/detail?hash=<SHORT_URL_HASH>
```

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

None.

### Query parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `hash` | string | Yes | Short URL hash code to retrieve click detail for. |
| `page` | number (double) | No | Page number for pagination (1-based). |
| `pageSize` | number (double) | No | Number of results per page. |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | `LogsDetailResult` |
| 400 | Bad Request. Invalid data provided | — |
| 401 | No valid authentication details were provided | — |
| 404 | Data cannot be found | — |
| 500 | System Error | — |

### 200 response schema

All response properties are optional in the schema.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message_id` | string | No | |
| `long_url` | string | No | |
| `short_url` | string | No | |
| `destination_number` | string | No | |
| `click_count` | number | No | |
| `view_count` | number | No | |
| `clicks` | array of `Click` | No | List of click events. |
| `views` | array of `View` | No | List of view events. |
| `pagination` | `Pagination` object | No | |

#### `clicks` item schema (`Click`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `dt` | string | No | |
| `user_agent` | string | No | |
| `ip` | string | No | |

#### `views` item schema (`View`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `dt` | string | No | |
| `user_agent` | string | No | |
| `ip` | string | No | |

#### `pagination` schema (`Pagination`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `page` | number | No | The current page of results |
| `page_size` | number | No | The amount of results returned per page |
| `total_count` | number | No | The total number of results in the results set |
| `page_count` | number | No | The total number of pages in the results set |
| `next_uri` | string | No | Link to the next page of results |
| `previous_uri` | string | No | Link to the previous page of results |

### Example 200 response

```json
{
  "message_id": "00000000-0000-0000-0000-000000000000",
  "long_url": "https://developers.sinch.com",
  "short_url": "https://nxt.to/abc1234",
  "destination_number": "+61491570157",
  "click_count": 3,
  "view_count": 2,
  "clicks": [
    {
      "dt": "2018-09-18T01:22:17.071493",
      "user_agent": "Mozilla/5.0 (Windows NT...",
      "ip": "127.0.0.1"
    }
  ],
  "views": [
    {
      "dt": "2018-09-18T01:22:17.071493",
      "user_agent": "Mozilla/5.0 (Windows NT...",
      "ip": "127.0.0.1"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 100,
    "page_count": 3
  }
}
```

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/reporting/links/detail?hash=abc1234&page=1&pageSize=20" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const url = new URL("https://eu.app.api.sinch.com/v1/reporting/links/detail");
url.search = new URLSearchParams({
  hash: "abc1234",
  page: "1",
  pageSize: "20"
});

const response = await fetch(url, {
  method: "GET",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});

const result = await response.json();
console.log(result);
```

## Error handling

- **400 Bad Request**: Bad Request. Invalid data provided. Check the supplied query parameter values.
- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials on the request.
- **404 Not Found**: Data cannot be found. No detail report matches the supplied `hash`.
- **500 Internal Server Error**: System Error.

## Related endpoints

- [Log summary](log-summary.md)

[← Short Trackable Links Reports](index.md)
