# Update assignment

Keep a dedicated-number assignment while replacing its label and metadata values.

| | |
|---|---|
| **Service** | [Dedicated Numbers](index.md) |
| **Method** | `PATCH` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/{numberId}/assignment` |
| **Operation ID** | `UpdateAssignment` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `204` — OK |
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

The request schema requires both properties, although the operation description says data that should not be updated can be excluded.

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
| 204 | OK | `Assignment` |
| 401 | No valid authentication details were provided | None |
| 403 | Unexpected error in API call. See HTTP response body for details. | `403response` |

### 204 response schema (`Assignment`)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | No | |
| `metadata` | object (string values) | No | |
| `number_id` | string | No | |
| `label` | string | No | |

### Example 204 response

```json
{
  "id": "b06387c0-f4d9-4333-8657-c819bede79c3",
  "number_id": "073fb6bd-f054-4644-aada-8fb204145d77"
}
```

### 403 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X PATCH "https://eu.app.api.sinch.com/v1/messaging/numbers/dedicated/b9ee3fe8-2c20-47b1-96e9-c5d12d7ed985/assignment" \
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
    method: "PATCH",
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
console.log(response.status);
```

## Error handling

- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials on the request.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.

## Related endpoints

- [Get assignment](get-assignment.md)
- [Delete assignment](delete-assignment.md)
- [Get assigned numbers](get-assigned-numbers.md)

## Specification details

Retain the dedicated number assignment, and edit or add additional metadata or title information. You can exclude any data from the body of this request that you do not want updated.

[← Dedicated Numbers](index.md)
