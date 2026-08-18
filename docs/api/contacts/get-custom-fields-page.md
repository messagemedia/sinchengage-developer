# Get custom fields page

Retrieves a paginated list of custom fields.

| | |
|---|---|
| **Service** | [Contacts](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/api/v1/contacts/custom-fields` |
| **Operation ID** | `getCustomFieldsPage` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — Returns a custom fields page |

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
| `request` | object | Yes | Pagination and filter options for the custom fields page (page tokens, page size, and related filters).<br> |

#### `request` fields

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `nextPageToken` | string | No |  |
| `prevPageToken` | string | No |  |
| `pageSize` | integer (int32); maximum: 1000 | No |  |
| `customFieldIds` | array of string (uuid) | No |  |
| `label` | string | No |  |
| `mergeTag` | string | No |  |

### Header parameters

None.


## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Returns a custom fields page | `PageTokenDtoCustomFieldData` |
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
| `content[].id` | string (uuid) | Yes | Custom field id in UUID format |
| `content[].accountId` | string | Yes | Account id |
| `content[].vendorId` | string | Yes | Vendor id |
| `content[].label` | string | Yes | Custom field label |
| `content[].mergeTag` | string | Yes | Custom field merge tag |
| `content[].maxLength` | integer (int32) | Yes | Custom field max length |
| `content[].type` | string; enum: `DATE`, `NUMBER`, `PHONE`, `TEXT`, `URL`, `ZIP_CODE`, `NAME`, `EMAIL` | Yes | Custom field type |
| `content[].createdDate` | string (date-time) | Yes | Create date |
| `content[].lastModifiedDate` | string (date-time) | Yes | Last modified date |
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
curl -X GET "https://eu.app.api.sinch.com/api/v1/contacts/custom-fields?pageSize=1" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/api/v1/contacts/custom-fields?pageSize=1", {
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

- [Create a custom field](create-custom-field.md)
- [Get a single custom field](get-custom-field-by-id.md)
- [Update a custom field](update-custom-field.md)
- [Delete a custom field](delete-custom-field-by-id.md)

[← Contacts](index.md)
