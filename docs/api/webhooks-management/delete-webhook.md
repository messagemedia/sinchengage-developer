# Delete webhook

Delete a webhook that was previously created for the connected account.

A webhook can be deleted by appending the UUID of the webhook to the endpoint and submitting a DELETE request. A successful request will return a `204 No Content` response with no body.

| | |
|---|---|
| **Service** | [Webhooks Management](index.md) |
| **Method** | `DELETE` |
| **URL** | `https://eu.app.api.sinch.com/v1/webhooks/messages/{webhookId}` |
| **Operation ID** | `DeleteWebhook` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports two authentication methods:

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | string (uuid) | Yes | Unique identifier of the webhook. Example: `7ca628a8-08b0-4e42-aeb8-960b37049c31` |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | Webhook deleted successfully | — |
| 401 | No valid authentication details were provided | — |
| 404 | Not found. | — |

### 204 response

No response body is returned on successful deletion.

## Examples

### cURL

```bash
curl -X DELETE "https://eu.app.api.sinch.com/v1/webhooks/messages/76fa7010-8c1f-4a24-917a-4d62a54e744d" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS"
```

### JavaScript (fetch)

```javascript
const webhookId = "76fa7010-8c1f-4a24-917a-4d62a54e744d";

const response = await fetch(`https://eu.app.api.sinch.com/v1/webhooks/messages/${webhookId}`, {
  method: "DELETE",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET")
  }
});

if (response.status === 204) {
  console.log("Webhook deleted successfully");
}
```

## Error handling

- **401 Unauthorized**: No valid authentication details were provided.
- **404 Not Found**: The specified webhook ID does not exist or belongs to a different account. Only pre-created webhooks can be deleted.

## Related endpoints

- [Create webhook](create-webhook.md)
- [Retrieve webhook](retrieve-webhook.md)
- [Update webhook](update-webhook.md)

[← Webhooks Management](index.md)
