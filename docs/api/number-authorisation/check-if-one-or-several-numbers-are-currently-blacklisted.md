# Check if one or several numbers are currently blacklisted

Check whether your account is authorised to send messages to one or more numbers before attempting a send.

| | |
|---|---|
| **Service** | [Number Authorisation](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/number_authorisation/is_authorised/{numbers}` |
| **Operation ID** | `CheckIfOneOrSeveralNumbersAreCurrentlyBlacklisted` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — Successful response. |
| **Required** | `numbers` path parameter |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `numbers` | array of strings | Yes | one or more numbers in international format separated by a comma, e.g. ```+61491570156,+61491570157``` | Minimum: 1 |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Successful response. | `Checkifoneorseveralnumbersarecurrentlyblacklistedresponse` |
| 400 | Bad Request | `400response` |
| 401 | Unauthorized | `403response` |

### 200 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `uri` | string | Yes | |
| `numbers` | array of `Number` | Yes | List of phone numbers. |

#### `numbers` item schema (`Number`)

Number authorisation result for a single phone number

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `number` | string | Yes | Phone number as a string |
| `authorised` | boolean | Yes | Whether the authenticated account is authorised to use this number |

### Example 200 response

```json
{
  "uri": "/v1/number_authorisation/is_authorised/+61491570156,+61491570157",
  "numbers": [
    {
      "number": "+61491570156",
      "authorised": true
    },
    {
      "number": "+61491570157",
      "authorised": false
    }
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
NUMBERS="+61491570156,+61491570157"

BASIC_AUTH=$(printf '%s' "${API_KEY}:${API_SECRET}" | base64 | tr -d '\n')
curl -sS -X GET "${API_HOST}/v1/number_authorisation/is_authorised/${NUMBERS}" \
  -H "Authorization: Basic ${BASIC_AUTH}" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'https://eu.app.api.sinch.com';
const numbers = '+61491570156,+61491570157';
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v1/number_authorisation/is_authorised/${numbers}`, {
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

- **400 Bad Request**: Bad Request. Check the `numbers` path value.
- **401 Unauthorized**: Unauthorized. Verify the authentication credentials on the request.

## Related endpoints

- [List all blocked numbers](list-all-blocked-numbers.md)
- [Add one or more numbers to your blacklist](add-one-or-more-numbers-to-your-blacklist.md)
- [Remove a number from the blacklist](remove-a-number-from-the-blacklist.md)

## Specification details

This endpoint lists for each requested number if you are authorised (which means the number is not blacklisted) to send to this number.

In the example given +61491570157 is on the blacklist.

NOTE: We do this call for you internally no matter what. Use this endpoint only if you want to have some indication upfront. If you send a message which is on the blacklist, we issue a delivery receipt with the appropriate status code.

[← Number Authorisation](index.md)
