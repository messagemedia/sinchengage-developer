# Remove contact from the contact list

Removes a contact from a contact list.

| | |
|---|---|
| **Service** | [Contacts](index.md) |
| **Method** | `DELETE` |
| **URL** | `https://eu.app.api.sinch.com/api/v1/contacts/lists/{listId}/contacts/{contactId}` |
| **Operation ID** | `removeContactFromContactList` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `204` — No Content |

## Authentication

This endpoint supports two authentication methods:

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `listId` | string (uuid) | Yes | Contact list id in UUID format |
| `contactId` | string (uuid) | Yes | Contact id to add in UUID format |

### Query parameters

None.

### Header parameters

None.


## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 204 | No Content | — |
| 400 | Request has incorrect values | `InvalidInputApiError` |
| 401 | No valid authentication details were provided | — |
| 403 | The authenticated user or account doesn't have permission | — |
| 409 | Conflict. The entity already exists. | `ApiError` |
| 500 | Internal server error | `ApiError` |
| 501 | Request not recognised | — |
| 502 | Invalid server response | — |
| 503 | Server currently unavailable | — |
| 504 | Gateway time out | — |

### 400 response schema

- **Content-Type:** `application/json`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `uuid` | string (uuid) | Yes | Error id in UUID format |
| `type` | string; enum: `validation`, `not_found`, `method_not_allowed`, `conflict`, `payload_too_large`, `unsupported_media_type`, `message_not_readable`, `internal_server_error`, `request_not_recognised`, `forbidden`, `bad_gateway`, `payment_required`, `unauthorized`, `unknown` | Yes | Error type |
| `title` | string | Yes | Error title |
| `detail` | string | Yes | Error additional details |
| `invalidFields` | array of object | Yes | List of invalid fields |
| `invalidFields[].name` | string | Yes | Invalid input field name |
| `invalidFields[].channelType` | string; enum: `PHONE`, `WHATSAPP`, `GBM`, `INSTAGRAM`, `FACEBOOK`, `EMAIL` | No | Invalid channel type |
| `invalidFields[].code` | string; enum: `must_not_be_empty`, `must_be_empty`, `must_not_be_null`, `invalid_length`, `duplicated_value`, `invalid_format`, `type_mismatch`, `missing_parameter`, `invalid_reference`, `incorrect_operation`, `no_such_pattern`, `constraint_violation` | Yes | Invalid input value code |
| `invalidFields[].reason` | string | Yes | Error message |
| `invalidFields[].invalidIds` | array of string | No |  |

### 409 and 500 response schema

- **Content-Type:** `application/json`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `uuid` | string (uuid) | Yes | Error id in UUID format |
| `type` | string; enum: `validation`, `not_found`, `method_not_allowed`, `conflict`, `payload_too_large`, `unsupported_media_type`, `message_not_readable`, `internal_server_error`, `request_not_recognised`, `forbidden`, `bad_gateway`, `payment_required`, `unauthorized`, `unknown` | Yes | Error type |
| `title` | string | Yes | Error title |
| `detail` | string | Yes | Error additional details |

## Examples

### cURL

```bash
curl -X DELETE "https://eu.app.api.sinch.com/api/v1/contacts/lists/025e93d3-051b-43f9-b12e-4b5842228dee/contacts/4a03d2d8-1f85-463f-bdb4-2891c17258a7" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/api/v1/contacts/lists/025e93d3-051b-43f9-b12e-4b5842228dee/contacts/4a03d2d8-1f85-463f-bdb4-2891c17258a7", {
  method: "DELETE",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});

console.log(response.status);
```

## Error handling

- **400 Bad Request**: Request has incorrect values
- **401 Unauthorized**: No valid authentication details were provided
- **403 Forbidden**: The authenticated user or account doesn't have permission
- **409 Conflict**: Conflict. The entity already exists.
- **500 Internal Server Error**: Internal server error
- **501 Not Implemented**: Request not recognised
- **502 Bad Gateway**: Invalid server response
- **503 Service Unavailable**: Server currently unavailable
- **504 Gateway Timeout**: Gateway time out

## Related endpoints

- [Get contact lists page](get-contact-lists-page.md)
- [Create a contact list](create-contact-list.md)
- [Get a single contact list](get-contact-list-by-id.md)
- [Update a contact list](update-contact-list.md)

[← Contacts](index.md)
