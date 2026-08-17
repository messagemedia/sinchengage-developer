# Get contacts page

Retrieves a paginated list of contacts.

| | |
|---|---|
| **Service** | [Contacts](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/api/v1/contacts/contacts` |
| **Operation ID** | `getContactsPage` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — Returns a contacts page |

## Authentication

This endpoint supports two authentication methods:

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

None.

### Query parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | object | Yes | Pagination and filter options for the contacts page (page tokens, page size, list/contact/channel filters).<br> |

#### `request` fields

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `nextPageToken` | string | No |  |
| `prevPageToken` | string | No |  |
| `pageSize` | integer (int32); maximum: 1000 | No |  |
| `listIds` | array of string (uuid) | No |  |
| `contactIds` | array of string (uuid) | No |  |
| `channelIds` | array of string | No |  |
| `channelTypes` | array of string; enum: `SMS`, `WHATSAPP`, `GBM`, `INSTAGRAM`, `FACEBOOK`, `EMAIL` | No |  |
| `channelSubscriptionState` | string; enum: `SUBSCRIBED`, `UNSUBSCRIBED` | No |  |

### Header parameters

None.


## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Returns a contacts page | `PageTokenDtoContactData` |
| 400 | Request has incorrect values | `InvalidInputApiError` |
| 401 | No valid authentication details were provided | — |
| 403 | The authenticated user or account doesn't have permission | — |
| 409 | Conflict. The entity already exists. | `ApiError` |
| 500 | Internal server error | `ApiError` |
| 501 | Request not recognised | — |
| 502 | Invalid server response | — |
| 503 | Server currently unavailable | — |
| 504 | Gateway time out | — |

### 200 response schema

- **Content-Type:** `*/*`

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `content` | array of object | Yes | Page content and number of elements is restricted by page size |
| `content[].id` | string (uuid) | Yes | Contact id in UUID format |
| `content[].accountId` | string | Yes | Account id |
| `content[].vendorId` | string | Yes | Vendor id |
| `content[].firstName` | string | Yes | Contact first name |
| `content[].lastName` | string | Yes | Contact last name |
| `content[].fullName` | string | Yes | Contact full name |
| `content[].alias` | string | Yes | Contact alias |
| `content[].dateOfBirth` | string (date) | No | Date of birth |
| `content[].country` | string | Yes | Country |
| `content[].state` | string | Yes | State |
| `content[].location` | string | Yes | Location |
| `content[].note` | string | Yes | Note |
| `content[].createdDate` | string (date-time) | Yes | Create date |
| `content[].lastModifiedDate` | string (date-time) | Yes | Last modified date |
| `content[].customFields` | array of object | Yes | List of custom fields |
| `content[].customFields[].id` | string (uuid) | Yes | Custom Field id in UUID format |
| `content[].customFields[].mergeTag` | string | Yes | Custom field merge tag |
| `content[].customFields[].value` | string | Yes | Custom field value |
| `content[].customFields[].type` | string; enum: `DATE`, `NUMBER`, `PHONE`, `TEXT`, `URL`, `ZIP_CODE`, `NAME`, `EMAIL` | Yes | Custom field type |
| `content[].channels` | array of object | Yes | Contact channels |
| `content[].channels[].channelId` | string | Yes | Contact channel id (in case phone number - in E164 international format) |
| `content[].channels[].type` | string; enum: `SMS`, `WHATSAPP`, `GBM`, `INSTAGRAM`, `FACEBOOK`, `EMAIL` | Yes | Contact channel type |
| `content[].channels[].subscriptionState` | string; enum: `SUBSCRIBED`, `UNSUBSCRIBED` | No | Subscription state |
| `content[].lists` | array of object | Yes | Contact lists |
| `content[].lists[].id` | string (uuid) | Yes | List id in UUID format |
| `content[].lists[].name` | string | Yes | List name |
| `nextPageToken` | string | No | Pagination token to retrieve the next page |
| `prevPageToken` | string | No | Pagination token to retrieve the previous page |
| `totalElements` | integer (int64) | Yes | Total number of elements |

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
curl -X GET "https://eu.app.api.sinch.com/api/v1/contacts/contacts?pageSize=1" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/api/v1/contacts/contacts?pageSize=1", {
  method: "GET",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json"
  }
});

const result = await response.json();
console.log(result);
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

- [Create a contact](create-contact.md)
- [Get a single contact](get-contact-by-id.md)
- [Update a contact](update-contact.md)
- [Delete a contact](delete-contact-by-id.md)

[← Contacts](index.md)
