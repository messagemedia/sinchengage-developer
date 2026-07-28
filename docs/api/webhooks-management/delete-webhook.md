# Delete webhook

Delete a webhook that was previously created for the connected account.

A webhook can be cancelled by appending the UUID of the webhook to the endpoint and submitting a DELETE request to the /webhooks/messages endpoint.

A successful request to the retrieve webhook endpoint will return a null response.

*Note: Only pre-created webhooks can be deleted. If an invalid or non existent webhook ID parameter is specified in the request, then a HTTP 404 Not Found response will be returned.*

| | |
|---|---|
| **Service** | [Webhooks Management](index.md) |
| **Method** | `DELETE` |
| **URL** | `https://eu.app.api.sinch.com/v1/webhooks/messages/{webhookId}` |
| **Operation ID** | `DeleteWebhook` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports the following schemes:

- **Basic Auth** (`basic_auth`): HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth** (`hmac_auth`): HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webhookId` | `string` (`uuid`) | Yes | Unique identifier of the webhook. Example: `7ca628a8-08b0-4e42-aeb8-960b37049c31` |

### Query parameters

None.

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| `204` | Webhook deleted successfully | — |
| `401` | No valid authentication details were provided | — |
| `404` | Not found. | — |

## Examples

### cURL

```bash
curl -X DELETE "https://eu.app.api.sinch.com/v1/webhooks/messages/7ca628a8-08b0-4e42-aeb8-960b37049c31" \
  -H "Accept: application/json" \
  -H "Authorization: Basic Base64(api_key:api_secret)"
```

### JavaScript (fetch)

```javascript
const webhookId = "7ca628a8-08b0-4e42-aeb8-960b37049c31";

const response = await fetch(
  `https://eu.app.api.sinch.com/v1/webhooks/messages/${webhookId}`,
  {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: "Basic " + btoa("api_key:api_secret"),
    },
  }
);

if (!response.ok) {
  throw new Error(`Delete failed: ${response.status}`);
}
```

## Error handling

- **`401`**: No valid authentication details were provided.
- **`404`**: Not found. Returned when an invalid or non-existent webhook ID is specified.
- A successful delete returns **`204`** with no response body.

## Related endpoints

- [Create webhook](create-webhook.md)
- [Retrieve webhook](retrieve-webhook.md)
- [Update webhook](update-webhook.md)

[← Webhooks Management](index.md)
