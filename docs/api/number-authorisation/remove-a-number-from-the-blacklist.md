# Remove a number from the blacklist

Remove one number from your account's blacklist.

| | |
|---|---|
| **Service** | [Number Authorisation](index.md) |
| **Method** | `DELETE` |
| **URL** | `https://eu.app.api.sinch.com/v1/number_authorisation/mt/blacklist/{number}` |
| **Operation ID** | `RemoveANumberFromTheBlacklist` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — The number has been successfully deleted. |
| **Required** | `number` path parameter |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `number` | string | Yes | a number in international format e.g. ```+61491570156``` |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | The number has been successfully deleted. | string (binary), `text/plain` |
| 401 | No valid authentication details were provided | None |
| 404 | Not found. | None |

### 200 response schema

- **Content-Type:** `text/plain`
- **Type:** string
- **Format:** binary
- **Description:** The number has been successfully deleted.

No response properties are declared.

## Examples

### cURL

```bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="https://eu.app.api.sinch.com"
NUMBER="+61491570156"

BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X DELETE "${API_HOST}/v1/number_authorisation/mt/blacklist/${NUMBER}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'https://eu.app.api.sinch.com';
const number = '+61491570156';
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/number_authorisation/mt/blacklist/${number}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
  },
});

console.log(response.status);
console.log(await response.text());
```

## Error handling

- **401 Unauthorized**: No valid authentication details were provided. Add valid authentication details to the request.
- **404 Not Found**: Not found. No blacklist entry matches the supplied `number`.

## Related endpoints

- [Add one or more numbers to your blacklist](add-one-or-more-numbers-to-your-blacklist.md)
- [List all blocked numbers](list-all-blocked-numbers.md)
- [Check if one or several numbers are currently blacklisted](check-if-one-or-several-numbers-are-currently-blacklisted.md)

## Specification details

This endpoint allows you to remove a number from the blacklist.  Only one number can be deleted per request.

In the example +61491570157 will be removed from the blacklist.

NOTE:  numbers need to be in international format and therefore start with a +

[← Number Authorisation](index.md)
