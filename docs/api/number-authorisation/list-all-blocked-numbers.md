# List all blocked numbers

Retrieve the numbers on your account's blacklist in pages of up to 100 entries.

| | |
|---|---|
| **Service** | [Number Authorisation](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/number_authorisation/mt/blacklist` |
| **Operation ID** | `ListAllBlockedNumbers` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — Number authorisation blacklist was returned successfully. |
| **Optional** | `token` query parameter |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

None.

### Query parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `token` | string | No | Opaque pagination token from a previous response. Omit on the first request. Pass the returned token to retrieve the next page of up to 100 numbers. |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Number authorisation blacklist was returned successfully. | `Getnumberauthorisationblacklistresponse` |
| 401 | Unauthorized | `403response` |

### 200 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `uri` | string | No | URL of the current API call, used to show the current pagination token for calls subsequent to the first one in the case of paginated data. |
| `numbers` | array of strings | No | List of numbers belonging to the blacklist. |
| `pagination` | `Pagination` | No | |

#### `pagination` schema (`Pagination`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `page` | string | No | The pagination token of the next set of results. |
| `next_uri` | string | No | The uri pointing to the next set of results. |

### Example 200 response

```json
{
  "uri": "/v1/number_authorisation/mt/blacklist\"",
  "numbers": [
    "+61491570156",
    "+61491570157"
  ],
  "pagination": {
    "page": "0",
    "next_uri": "/v1/number_authorisation/mt/blacklist?token=0"
  }
}
```

### 401 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

### Example 401 response

```json
{
  "message": "Invalid authentication credentials"
}
```

## Examples

Omit `token` on the first request. For a subsequent page, pass the token returned in `pagination.page`.

### cURL

```bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="https://eu.app.api.sinch.com"
TOKEN="eyJwYWdlIjoyfQ"

BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X GET "${API_HOST}/v1/number_authorisation/mt/blacklist?token=${TOKEN}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'https://eu.app.api.sinch.com';
const token = 'eyJwYWdlIjoyfQ';
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/number_authorisation/mt/blacklist?token=${token}`, {
  method: 'GET',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
  },
});

console.log(response.status);
console.log(await response.json());
```

## Error handling

- **401 Unauthorized**: Unauthorized. Verify the authentication credentials on the request.

## Related endpoints

- [Check if one or several numbers are currently blacklisted](check-if-one-or-several-numbers-are-currently-blacklisted.md)
- [Add one or more numbers to your blacklist](add-one-or-more-numbers-to-your-blacklist.md)
- [Remove a number from the blacklist](remove-a-number-from-the-blacklist.md)

## Specification details

This endpoint returns a list of 100 numbers that are on the blacklist.  There is a pagination token to retrieve the next 100 numbers

In the example response the numbers `+61491570156` and `+61491570157` are on the blacklist and therefore will never receive any messages from you.

[← Number Authorisation](index.md)
