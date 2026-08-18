# Get numbers

Search the available dedicated-number inventory using country, digit pattern, capability, number type, and pagination filters.

| | |
|---|---|
| **Service** | [Dedicated Numbers](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/` |
| **Operation ID** | `GetNumbers` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — OK |
| **Required** | None |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

None.

### Query parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `country` | string | No | ISO_3166 country code, 2 character code to filter available numbers by country |
| `matching` | string | No | Filters results by a pattern of digits contained within the number |
| `page_size` | integer (int32) | No | number of results returned per page, default 50 |
| `service_types` | string | No | filter results to include numbers with certain capabilities Enum: `SMS`, `TTS`, `MMS` |
| `types` | array of strings | No | Filter results by one or more number types. Pass repeated query parameters or a comma-separated list (for example `types=MOBILE,LANDLINE,TOLL_FREE`). Items enum: `MOBILE`, `LANDLINE`, `TEN_DLC`, `TOLL_FREE`, `SHORT_CODE`, `HOSTED_TEN_DLC`, `HOSTED_TOLL_FREE` |
| `token` | string (uuid) | No | In paginated data the original request will return with a "next_token" attribute. This token must be entered into subsequent call in the "token" query parameter to obtain the next set of records. |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | `NumbersListResponse` |
| 401 | No valid authentication details were provided | None |
| 403 | Unexpected error in API call. See HTTP response body for details. | `403response` |

### 200 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `data` | array | No | List of result items. |
| `pagination` | object (`TokenPagination`) | No | Cursor-style pagination used by Dedicated Numbers list endpoints. Pass `next_token` back as the `token` query parameter to fetch the next page. |

#### `data` item schema (`DedicatedNumber`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string (uuid) | No | Unique identifier of the dedicated number |
| `phone_number` | string | No | Phone number as a string (digits; may include a leading +) |
| `country` | string | No | ISO 3166-1 alpha-2 country code |
| `type` | string | No | Dedicated number type Enum: `MOBILE`, `LANDLINE`, `TEN_DLC`, `TOLL_FREE`, `SHORT_CODE`, `HOSTED_TEN_DLC`, `HOSTED_TOLL_FREE` |
| `classification` | string | No | Enum: `BRONZE`, `SILVER`, `GOLD` |
| `available_after` | string (date-time) | No | Earliest time this number can be assigned |
| `capabilities` | array of strings | No | Capabilities supported by this number Items enum: `SMS`, `TTS`, `MMS` |

#### `pagination` schema (`TokenPagination`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `page_size` | integer (int32) | No | Number of results returned in this page |
| `next_token` | string (uuid) | No | Token for the next page of results. Omit or null when there are no further pages. Pass this value as the `token` query parameter on the next request. |

### Example 200 response

```json
{
  "pagination": {
    "next_token": "0428d673-0f75-4063-9493-e89d75f13438",
    "page_size": 5
  },
  "data": [
    {
      "id": "03cf54ad-a4a3-4cd1-afd5-e0ca2cf158a3",
      "phone_number": "61436489205",
      "country": "AU",
      "type": "MOBILE",
      "classification": "BRONZE",
      "available_after": "2019-08-06T23:56:15.633Z",
      "capabilities": ["SMS"]
    }
  ]
}
```

### 403 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/?country=AU&types=MOBILE%2CLANDLINE&page_size=20" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const url = new URL("https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/");
url.searchParams.set("country", "AU");
url.searchParams.set("types", "MOBILE,LANDLINE");
url.searchParams.set("page_size", "20");

const response = await fetch(url, {
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});
const result = await response.json();
console.log(result.data, result.pagination?.next_token);
```

## Error handling

- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials on the request.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.

## Related endpoints

- [Get number by ID](get-number-by-id.md)
- [Create assignment](create-assignment.md)
- [Get assigned numbers](get-assigned-numbers.md)

## Specification details

Get a list of available dedicated numbers, filtered by requirements.

[← Dedicated Numbers](index.md)
