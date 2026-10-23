# Get Credit Balance

Get the credit balance for a prepaid account.

| | |
|---|---|
| **Service** | [Credits](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/credits_management/account` |
| **Operation ID** | `GetCreditBalance` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — Credit balance |
| **Required** | None (no path, query, or body parameters) |

### Example success body

```json
{
  "remaining_credits": {
    "MT_MMS": 20,
    "MT_SMS": 1024
  },
  "related_account": "VendorName:RelatedAccountName",
  "expiry": "2018-01-12T12:12:12.122Z"
}
```

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

None.

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Credit balance | `CreditBalance` |
| 401 | No valid authentication details were provided | |
| 403 | The authenticated user or account doesn't have permission | — |
| 404 | Account is not a prepaid account | `CreditError` |
| 503 | Server currently unavailable | — |

### 200 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `remaining_credits` | object | Yes | Remaining credit balances. A balance field is omitted when no balance has been set. |
| `related_account` | string | No | Vendor and account id of the credit-tracking related account. |
| `expiry` | string (date-time) | No | The expiration date time. The format is E8601DTw.d (yyyy-mm-ddThh:mm:ss.ffffff). |

#### `remaining_credits` schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `MT_MMS` | number | No | The credit balance for MT MMS credits. This field may not be present if a balance hasn't been set. |
| `MT_SMS` | number | No | The credit balance for MT SMS credits. This field may not be present if a balance hasn't been set. It is a decimal value only if the billing type is PREPAID_MONEY. |

### 404 response schema (`CreditError`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | The error message. |
| `details` | array of string | No | Extra detail to explain why the request failed. |

### Example 404 response

```json
{
  "message": "Description of what went wrong",
  "details": [
    "More details to understand why it went wrong"
  ]
}
```

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/credits_management/account" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/credits_management/account", {
  method: "GET",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});

const result = await response.json();
console.log(result.remaining_credits);
```

## Error handling

- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials on the request.
- **403 Forbidden**: The authenticated user or account doesn't have permission.
- **404 Not Found**: Account is not a prepaid account.
- **503 Service Unavailable**: Server currently unavailable.

[← Credits](index.md)
