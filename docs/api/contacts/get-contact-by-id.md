# Get a single contact

Retrieves details for a single contact by ID.

| | |
|---|---|
| **Service** | [Contacts](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/api/v1/contacts/contacts/{contactId}` |
| **Operation ID** | `getContactById` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — Returns a single contact |

## Authentication

This endpoint supports two authentication methods:

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactId` | string (uuid) | Yes | Contact id in UUID format |

### Query parameters

None.

### Header parameters

None.


## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | Returns a single contact | `ContactData` |
| 400 | Request has incorrect values | `InvalidInputApiError` |
| 401 | No valid authentication details were provided | — |
| 403 | The authenticated user or account doesn't have permission | — |
| 404 | The specified resource not found | `ApiError` |
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
| `id` | string (uuid) | Yes | Contact id in UUID format |
| `accountId` | string | Yes | Account id |
| `vendorId` | string | Yes | Vendor id |
| `firstName` | string | Yes | Contact first name |
| `lastName` | string | Yes | Contact last name |
| `fullName` | string | Yes | Contact full name |
| `alias` | string | Yes | Contact alias |
| `dateOfBirth` | string (date) | No | Date of birth |
| `country` | string | Yes | Country |
| `state` | string | Yes | State |
| `location` | string | Yes | Location |
| `note` | string | Yes | Note |
| `createdDate` | string (date-time) | Yes | Create date |
| `lastModifiedDate` | string (date-time) | Yes | Last modified date |
| `customFields` | array of object | Yes | List of custom fields |
| `customFields[].id` | string (uuid) | Yes | Custom Field id in UUID format |
| `customFields[].mergeTag` | string | Yes | Custom field merge tag |
| `customFields[].value` | string | Yes | Custom field value |
| `customFields[].type` | string; enum: `DATE`, `NUMBER`, `PHONE`, `TEXT`, `URL`, `ZIP_CODE`, `NAME`, `EMAIL` | Yes | Custom field type |
| `channels` | array of object | Yes | Contact channels |
| `channels[].channelId` | string | Yes | Contact channel id (in case phone number - in E164 international format) |
| `channels[].type` | string; enum: `SMS`, `WHATSAPP`, `GBM`, `INSTAGRAM`, `FACEBOOK`, `EMAIL` | Yes | Contact channel type |
| `channels[].subscriptionState` | string; enum: `SUBSCRIBED`, `UNSUBSCRIBED` | No | Subscription state |
| `lists` | array of object | Yes | Contact lists |
| `lists[].id` | string (uuid) | Yes | List id in UUID format |
| `lists[].name` | string | Yes | List name |

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

### 404 and 409 and 500 response schema

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
curl -X GET "https://eu.app.api.sinch.com/api/v1/contacts/contacts/3fa85f64-5717-4562-b3fc-2c963f66afa6" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/api/v1/contacts/contacts/3fa85f64-5717-4562-b3fc-2c963f66afa6", {
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
- **404 Not Found**: The specified resource not found
- **409 Conflict**: Conflict. The entity already exists.
- **500 Internal Server Error**: Internal server error
- **501 Not Implemented**: Request not recognised
- **502 Bad Gateway**: Invalid server response
- **503 Service Unavailable**: Server currently unavailable
- **504 Gateway Timeout**: Gateway time out

## Related endpoints

- [Get contacts page](get-contacts-page.md)
- [Create a contact](create-contact.md)
- [Update a contact](update-contact.md)
- [Delete a contact](delete-contact-by-id.md)

[← Contacts](index.md)
