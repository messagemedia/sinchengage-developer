# Log summary

Retrieve aggregate click and view counts for short trackable URLs, optionally filtered by metadata, URL, or recipient.

Clicks summary report for metadata key value pair, long url and short url.

| | |
|---|---|
| **Service** | [Short Trackable Links Reports](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/reporting/links/summary` |
| **Operation ID** | `LogSummary` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — OK |
| **Required** | None (all query parameters are optional) |

### Minimal request

```text
GET /v1/reporting/links/summary
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
| `key` | string | No | Metadata key used to filter results. |
| `value` | string | No | Metadata value used to filter results. |
| `url` | string | No | URL used to filter results. |
| `recipient` | string | No | Recipient address used to filter results. |
| `page` | number (double) | No | Page number for pagination (1-based). |
| `pageSize` | number (double) | No | Number of results per page. |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | `LogSummaryResult` |
| 400 | Bad Request. Invalid data provided | — |
| 401 | No valid authentication details were provided | — |
| 404 | Data cannot be found | — |
| 500 | System Error | — |

### 200 response schema

All response properties are optional in the schema.

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `total_clicks` | number | No | |
| `unique_clicks` | number | No | |
| `total_views` | number | No | |
| `unique_views` | number | No | |
| `short_urls_generated` | number | No | |
| `short_urls` | array of `ShortUrl` | No | List of short URLs. |
| `pagination` | `Pagination` object | No | |

#### `short_urls` item schema (`ShortUrl`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `click_count` | number | No | |
| `view_count` | number | No | |
| `message_id` | string | No | |
| `long_url` | string | No | |
| `short_url` | string | No | |
| `destination_number` | string | No | |

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
  "total_clicks": 3,
  "unique_clicks": 1,
  "total_views": 2,
  "unique_views": 1,
  "short_urls_generated": 1,
  "short_urls": [
    {
      "click_count": 3,
      "view_count": 2,
      "message_id": "00000000-0000-0000-0000-000000000000",
      "long_url": "https://developers.sinch.com",
      "short_url": "https://nxt.to/abc1234",
      "destination_number": "+61491570157"
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
curl -X GET "https://eu.app.api.sinch.com/v1/reporting/links/summary?key=campaign&value=example&url=https%3A%2F%2Fdevelopers.sinch.com&recipient=%2B61491570157&page=1&pageSize=20" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const url = new URL("https://eu.app.api.sinch.com/v1/reporting/links/summary");
url.search = new URLSearchParams({
  key: "campaign",
  value: "example",
  url: "https://developers.sinch.com",
  recipient: "+61491570157",
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
- **404 Not Found**: Data cannot be found.
- **500 Internal Server Error**: System Error.

## Related endpoints

- [Log detail](log-detail.md)

[← Short Trackable Links Reports](index.md)
