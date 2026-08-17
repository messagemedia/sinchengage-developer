# Add one or more numbers to your blacklist

Add up to 10 numbers to your account's blacklist in one request.

| | |
|---|---|
| **Service** | [Number Authorisation](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/number_authorisation/mt/blacklist` |
| **Operation ID** | `AddOneOrMoreNumbersToYourBlacklist` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `201` — If all the numbers are already on the blacklist, then a 200 is returned. |
| **Required body** | `numbers` |

### Minimal request

```json
{
  "numbers": [
    "61491570156"
  ]
}
```

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

None.

### Query parameters

None.

### Header parameters

None.

## Request body

- **Description:** Request body.
- **Content-Type:** `application/json`
- **Required:** true

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `numbers` | array of strings | Yes | Array of numbers to be added to the blacklist. These should be specified in E.164 international format. For information on E.164, please refer to http://en.wikipedia.org/wiki/E.164. |

### Example request body

```json
{
  "numbers": [
    "61491570156",
    "61491570157"
  ]
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | If all the numbers are already on the blacklist, then a 200 is returned. | `Addoneormorenumberstoyourblacklistresponse` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | `403response` |

### 201 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `uri` | string | Yes | |
| `numbers` | array of strings | Yes | List of phone numbers. |

### Example 201 response

```json
{
  "uri": "/v1/number_authorisation/mt/blacklist",
  "numbers": [
    "61491570156",
    "61491570157"
  ]
}
```

### 400 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |
| `details` | array of strings | Yes | Additional error detail messages. |

### Example 400 response

```json
{
  "message": "Request failed to parse correctly. Please ensure input is valid and try again.",
  "details": [
    "Failed to parse message body."
  ]
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

### cURL

```bash
API_KEY="YOUR_API_KEY"
API_SECRET="YOUR_API_SECRET"
API_HOST="https://eu.app.api.sinch.com"

BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X POST "${API_HOST}/v1/number_authorisation/mt/blacklist" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "numbers": [
      "61491570156",
      "61491570157"
    ]
  }'
```

### JavaScript (fetch)

```javascript
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'https://eu.app.api.sinch.com';
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/number_authorisation/mt/blacklist`, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    numbers: [
      '61491570156',
      '61491570157',
    ],
  }),
});

console.log(response.status);
console.log(await response.json());
```

## Error handling

- **400 Bad Request**: Bad Request. Check the JSON request body.
- **401 Unauthorized**: Unauthorized. Verify the authentication credentials on the request.

## Related endpoints

- [List all blocked numbers](list-all-blocked-numbers.md)
- [Remove a number from the blacklist](remove-a-number-from-the-blacklist.md)
- [Check if one or several numbers are currently blacklisted](check-if-one-or-several-numbers-are-currently-blacklisted.md)

## Specification details

This endpoint allows you to add one or more numbers to your blacklist. You can add up to 10 numbers in one request.

NOTE: numbers need to be in international format and therefore start with a +

[← Number Authorisation](index.md)
