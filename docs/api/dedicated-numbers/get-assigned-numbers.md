# Get assigned numbers

List dedicated numbers assigned to the authenticated account, with inventory details and assignment metadata.

| | |
|---|---|
| **Service** | [Dedicated Numbers](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/assignments` |
| **Operation ID** | `GetAssignedNumbers` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — OK |
| **Required** | `Accept` header |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

None.

### Query parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page_size` | integer (int32) | No | Number of results returned per page, default 50 |
| `token` | string | No | In paginated data the original request will return with a "next_token" attribute. This token must be entered into subsequent call in the "token" query parameter to obtain the next set of records. |
| `number_id` | string | No | Unique identifier of a specific number |
| `matching` | string | No | Filters results by a pattern of digits contained within the number |
| `country` | string | No | Filter results by ISO_3166 country code, 2 character code to filter available numbers by country |
| `type` | string | No | Filter results by Number type. When both `type` and `types` are provided, `types` will take precedence, and `type` will be ignored. Enum: `MOBILE`, `LANDLINE`, `TEN_DLC`, `TOLL_FREE`, `SHORT_CODE`, `HOSTED_TEN_DLC`, `HOSTED_TOLL_FREE` |
| `types` | array of strings | No | Filter results by Number Types Items enum: `MOBILE`, `LANDLINE`, `TEN_DLC`, `TOLL_FREE`, `SHORT_CODE`, `HOSTED_TEN_DLC`, `HOSTED_TOLL_FREE` |
| `classification` | string | No | Filter results by Number Classification Enum: `BRONZE`, `SILVER`, `GOLD` |
| `service_types` | string | No | Filter results by capabilities Enum: `SMS`, `TTS`, `MMS` |
| `label` | string | No | Filter results by a matching label |
| `sort_by` | string | No | Sort results by property Enum: `ACCOUNT`, `ACTION`, `DESTINATION_ADDRESS`, `DESTINATION_ADDRESS_COUNTRY`, `FORMAT`, `SOURCE_ADDRESS`, `SOURCE_ADDRESS_COUNTRY`, `TIMESTAMP` |
| `sort_direction` | string | No | Sort direction Enum: `ASCENDING`, `DESCENDING` |

### Header parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Accept` | string | Yes | Requested response media type. |

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | `AssignedNumberListResponse` |
| 401 | Unauthorized | `403response` |

### 200 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `data` | array | No | List of result items. |
| `pagination` | object (`TokenPagination`) | No | Cursor-style pagination used by Dedicated Numbers list endpoints. Pass `next_token` back as the `token` query parameter to fetch the next page. |

#### `data` item schema (`AssignedNumber`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `assignment` | object (`Assignment`) | No | |
| `number` | object (`DedicatedNumber`) | No | |

##### `assignment` schema (`Assignment`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | No | |
| `metadata` | object (string values) | No | |
| `number_id` | string | No | |
| `label` | string | No | |

##### `number` schema (`DedicatedNumber`)

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
      "assignment": {
        "metadata": {
          "Key1": "value1",
          "Key2": "value2"
        },
        "label": "LabelTest0",
        "id": "be3cb602-7c00-4c87-ae4b-b8defc04f179",
        "number_id": "b9ee3fe8-2c20-47b1-96e9-c5d12d7ed985"
      },
      "number": {
        "id": "03cf54ad-a4a3-4cd1-afd5-e0ca2cf158a3",
        "phone_number": "61436489205",
        "country": "AU",
        "type": "MOBILE",
        "classification": "BRONZE",
        "available_after": "2019-08-06T23:56:15.633Z",
        "capabilities": ["SMS"]
      }
    }
  ]
}
```

### 401 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/assignments?country=AU&types=MOBILE%2CLANDLINE&page_size=20&sort_direction=ASCENDING" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json;charset=UTF-8"
```

### JavaScript (fetch)

```javascript
const url = new URL("https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/assignments");
url.searchParams.set("country", "AU");
url.searchParams.set("types", "MOBILE,LANDLINE");
url.searchParams.set("page_size", "20");
url.searchParams.set("sort_direction", "ASCENDING");

const response = await fetch(url, {
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json;charset=UTF-8"
  }
});
const result = await response.json();
console.log(result.data, result.pagination?.next_token);
```

## Error handling

- **401 Unauthorized**: Unauthorized. Verify Basic or HMAC credentials on the request.

## Related endpoints

- [Get assignment](get-assignment.md)
- [Update assignment](update-assignment.md)
- [Delete assignment](delete-assignment.md)

## Specification details

Retrieves the list of assigned dedicated numbers.

[← Dedicated Numbers](index.md)
