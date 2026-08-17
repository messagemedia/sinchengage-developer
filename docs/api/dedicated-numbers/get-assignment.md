# Get assignment

Retrieve the assignment record, including its label and metadata, for a dedicated number.

| | |
|---|---|
| **Service** | [Dedicated Numbers](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/{numberId}/assignment` |
| **Operation ID** | `GetAssignment` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — OK |
| **Required** | `numberId` path parameter and `Accept` header |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `numberId` | string | Yes | unique identifier |

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
| 200 | OK | `Assignment` |
| 401 | No valid authentication details were provided | None |
| 403 | Unexpected error in API call. See HTTP response body for details. | `403response` |
| 404 | Unexpected error in API call. See HTTP response body for details. | `404response` |

### 200 response schema (`Assignment`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | No | |
| `metadata` | object (string values) | No | |
| `number_id` | string | No | |
| `label` | string | No | |

### Example 200 response

```json
{
  "metadata": {
    "key1": "value1"
  },
  "label": "LabelTest0",
  "id": "be3cb602-7c00-4c87-ae4b-b8defc04f179",
  "number_id": "b9ee3fe8-2c20-47b1-96e9-c5d12d7ed985"
}
```

### 403 and 404 response schemas

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/b9ee3fe8-2c20-47b1-96e9-c5d12d7ed985/assignment" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json;charset=UTF-8"
```

### JavaScript (fetch)

```javascript
const numberId = "b9ee3fe8-2c20-47b1-96e9-c5d12d7ed985";
const response = await fetch(
  `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/${numberId}/assignment`,
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
- **404 Not Found**: Unexpected error in API call. See HTTP response body for details. No assignment matches the supplied `numberId`.

## Related endpoints

- [Get assigned numbers](get-assigned-numbers.md)
- [Update assignment](update-assignment.md)
- [Delete assignment](delete-assignment.md)

## Specification details

Use this endpoint to view details of the assignment including the label and metadata.

[← Dedicated Numbers](index.md)
