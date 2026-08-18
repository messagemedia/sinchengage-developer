# Get number by ID

Retrieve the details and capabilities of one dedicated number before assigning it.

| | |
|---|---|
| **Service** | [Dedicated Numbers](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/{id}` |
| **Operation ID** | `GetNumberById` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — OK |
| **Required** | `id` path parameter and `Accept` header |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | unique identifier |

### Query parameters

None.

### Header parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Accept` | string | Yes | Requested response media type. |

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | OK | `DedicatedNumber` |
| 401 | No valid authentication details were provided | None |
| 403 | Unexpected error in API call. See HTTP response body for details. | `403response` |
| 404 | Unexpected error in API call. See HTTP response body for details. | `404response` |

### 200 response schema (`DedicatedNumber`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string (uuid) | No | Unique identifier of the dedicated number |
| `phone_number` | string | No | Phone number as a string (digits; may include a leading +) |
| `country` | string | No | ISO 3166-1 alpha-2 country code |
| `type` | string | No | Dedicated number type Enum: `MOBILE`, `LANDLINE`, `TEN_DLC`, `TOLL_FREE`, `SHORT_CODE`, `HOSTED_TEN_DLC`, `HOSTED_TOLL_FREE` |
| `classification` | string | No | Enum: `BRONZE`, `SILVER`, `GOLD` |
| `available_after` | string (date-time) | No | Earliest time this number can be assigned |
| `capabilities` | array of strings | No | Capabilities supported by this number Items enum: `SMS`, `TTS`, `MMS` |

### Example 200 response

```json
{
  "id": "be3cb602-7c00-4c87-ae4b-b8defc04f179",
  "phone_number": "614111111111",
  "country": "AU",
  "type": "MOBILE",
  "classification": "SILVER",
  "available_after": "2019-06-21T04:04:31.707Z",
  "capabilities": ["SMS", "MMS"]
}
```

### 403 and 404 response schemas

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/7ca628a8-08b0-4e42-aeb8-960b37049c31" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json;charset=UTF-8"
```

### JavaScript (fetch)

```javascript
const numberId = "7ca628a8-08b0-4e42-aeb8-960b37049c31";
const response = await fetch(
  `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/${numberId}`,
  {
    headers: {
      "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
      "Accept": "application/json;charset=UTF-8"
    }
  }
);
const result = await response.json();
console.log(result);
```

## Error handling

- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials on the request.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.
- **404 Not Found**: Unexpected error in API call. See HTTP response body for details. No number matches the supplied `id`.

## Related endpoints

- [Get numbers](get-numbers.md)
- [Create assignment](create-assignment.md)

## Specification details

Get details about a specific dedicated number.

[← Dedicated Numbers](index.md)
