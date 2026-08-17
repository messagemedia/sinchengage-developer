# Create assignment

Assign an available dedicated number to the authenticated account and attach a required label and metadata.

| | |
|---|---|
| **Service** | [Dedicated Numbers](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/{numberId}/assignment` |
| **Operation ID** | `CreateAssignment` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `201` — Created |
| **Required body** | `label` and `metadata` |

### Minimal request

```json
{
  "label": "ExampleLabel",
  "metadata": {}
}
```

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

- **Description:** Request body.
- **Content-Type:** `application/json`
- **Required:** true

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | Yes | |
| `metadata` | object (string values) | Yes | |

The request schema requires both properties, even though the operation description says to specify a label or metadata.

### Example request body

```json
{
  "label": "ExampleLabel",
  "metadata": {
    "Key1": "value1",
    "Key2": "value2"
  }
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | Created | `Assignment` |
| 401 | No valid authentication details were provided | None |
| 403 | Unexpected error in API call. See HTTP response body for details. | `403response` |
| 404 | Unexpected error in API call. See HTTP response body for details. | `404response` |

### 201 response schema (`Assignment`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | No | |
| `metadata` | object (string values) | No | |
| `number_id` | string | No | |
| `label` | string | No | |

### Example 201 response

```json
{
  "label": "cillum irure",
  "number_id": "et pariatur"
}
```

### 403 and 404 response schemas

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/b9ee3fe8-2c20-47b1-96e9-c5d12d7ed985/assignment" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json;charset=UTF-8" \
  -H "Content-Type: application/json" \
  -d '{
    "label": "ExampleLabel",
    "metadata": {
      "Key1": "value1",
      "Key2": "value2"
    }
  }'
```

### JavaScript (fetch)

```javascript
const numberId = "b9ee3fe8-2c20-47b1-96e9-c5d12d7ed985";
const response = await fetch(
  `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/${numberId}/assignment`,
  {
    method: "POST",
    headers: {
      "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
      "Accept": "application/json;charset=UTF-8",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      label: "ExampleLabel",
      metadata: {Key1: "value1", Key2: "value2"}
    })
  }
);
const result = await response.json();
console.log(result);
```

## Error handling

- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials on the request.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.
- **404 Not Found**: Unexpected error in API call. See HTTP response body for details. No number matches the supplied `numberId`.
- The operation description also documents a conflict when the selected number is unavailable, although `409` is not declared in this operation's `responses` map.

## Related endpoints

- [Get numbers](get-numbers.md)
- [Get number by ID](get-number-by-id.md)
- [Get assignment](get-assignment.md)

## Specification details

Assign the specified number to the authenticated account. 

Use the body of the request to specify a label or metadata 

for this number assignment.

If you receive a *conflict* error then the number that you have selected is unavailable for assignment. 

This means that the number is either already assigned to another account, 

or has an available_after date in the future. Should this occur, perform 

another search and select a different number.

[← Dedicated Numbers](index.md)
