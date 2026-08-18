# Get all approved sender addresses

List approved sender addresses, optionally filtering and paginating the results.

| | |
|---|---|
| **Service** | [Source Address](index.md) |
| **Method** | `GET` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/` |
| **Operation ID** | `GetAllApprovedSenderAddresses` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `200` — A list of approved sender addresses for your account only |
| **Required** | None |

### Example success body

```json
{
  "data": [
    {
      "id": "7927d9eb-4e74-4021-836e-6cae071f84e7",
      "sender_address": "EXAMPLE1",
      "sender_address_type": "ALPHANUMERIC",
      "usage_type": "ALPHANUMERIC",
      "destination_countries": [
        "AU"
      ],
      "reason": "This is my reason 1",
      "label": "This is my label 1",
      "account_id": "my_account",
      "created_date": "2023-08-04T04:21:55.958Z",
      "last_modified_date": "2023-08-04T04:21:55.958Z"
    },
    {
      "id": "365dd65f-7101-46cd-8e79-e49c5620eb15",
      "sender_address": "EXAMPLE2",
      "sender_address_type": "ALPHANUMERIC",
      "usage_type": "ALPHANUMERIC",
      "destination_countries": [
        "AU"
      ],
      "reason": "This is my reason 2",
      "label": "This is my label 2",
      "account_id": "my_account",
      "created_date": "2023-08-14T04:21:55.958Z",
      "last_modified_date": "2023-08-14T04:21:55.958Z"
    },
    {
      "id": "4a9cb0f4-f383-40b5-84dc-bbb6a3b210dd",
      "sender_address": "61491570156",
      "sender_address_type": "INTERNATIONAL",
      "usage_type": "OWN_NUMBER",
      "destination_countries": [
        "AU"
      ],
      "reason": "This is my reason 3",
      "label": "This is my label 3",
      "account_id": "my_account",
      "created_date": "2023-08-24T04:21:55.958Z",
      "last_modified_date": "2023-08-24T04:21:55.958Z",
      "expiry": "2024-08-03T04:21:55.958Z",
      "display_status": "APPROVED"
    }
  ],
  "pagination": {
    "page_size": 20,
    "next_token": "UWFTeXNBZGRyMSN8JEAsdmVuZG9ySWRUZXN0MSN8JEAsYWNjb3VudElkVGVzdDI="
  }
}
```

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

None.

### Query parameters

| Name | Type | Required | Description | Constraints |
|------|------|----------|-------------|-------------|
| `sender_address` | string | No | A string containing some or all of a specific Sender ID |  |
| `sender_address_type` | string | No | The type of Sender ID. This will be either ALPHANUMERIC, INTERNATIONAL, or SHORT_CODE | Enum: `ALPHANUMERIC`, `INTERNATIONAL`, `SHORT_CODE` |
| `usage_type` | string | No | The usage type of the Sender ID | Enum: `ALPHANUMERIC`, `OWN_NUMBER`, `DEDICATED`, `HOSTED_NUMBER` |
| `include_related_accounts` | boolean | No | When true, include Sender IDs that belong to related accounts in addition to those on the authenticated account.<br> |  |
| `expiry_status` | string | No | Filter the results by OWN_NUMBER Sender IDs that are already expired, or will expire soon.<br>Acceptable values are EXPIRED and EXPIRING. This parameter requires both the sender_address_type and usage_type parameters to be present.<br> | Enum: `EXPIRED`, `EXPIRING` |
| `page_size` | integer | No | The number of results per page. Default is 20. | Default: `20` |
| `token` | string | No | In paginated data, the original request will return with a "next_token" attribute. This token must be entered into subsequent call in the "token" query parameter to obtain the next set of records. |  |

### Header parameters

None.

## Request body

None.

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 200 | A list of approved sender addresses for your account only | `GetAllApprovedSenderAddresses` |
| 400 | Bad request | `400response` |
| 401 | Unauthorized | None |
| 403 | Forbidden | `403response` |

### 200 response schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `data` | array of object | No |  |  |
| `pagination` | object | No |  |  |

#### `data[]` schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `id` | string (uuid) | No | Approved sender address UUID (use for get, update, re-verify, and delete) |  |
| `sender_address` | string | No | The sender address value (alpha tag or phone number as a string) |  |
| `sender_address_type` | string | No | The Sender Address Type | Enum: `ALPHANUMERIC`, `INTERNATIONAL`, `SHORT_CODE` |
| `usage_type` | string | No | The Sender Address Usage Type | Enum: `ALPHANUMERIC`, `OWN_NUMBER`, `DEDICATED`, `HOSTED_NUMBER` |
| `destination_countries` | array of string | No | list of 2-character ISO country codes this sender address applies to |  |
| `reason` | string | No |  |  |
| `label` | string | No |  |  |
| `account_id` | string | No | Account that owns this sender address |  |
| `created_date` | string (date-time) | No |  |  |
| `last_modified_date` | string (date-time) | No |  |  |
| `expiry` | string (date-time) | No | The Sender Address expiration time (apply for sender_address_type = OWN_NUMBER)<br> |  |
| `display_status` | string | No | The Sender Address status (apply for sender_address_type = OWN_NUMBER)<br> | Enum: `APPROVED`, `EXPIRING`, `EXPIRED` |

#### `pagination` schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `page_size` | number | No |  |  |
| `next_token` | string | No | The pagination token of the next set of results. |  |

### Example 200 response

```json
{
  "data": [
    {
      "id": "7927d9eb-4e74-4021-836e-6cae071f84e7",
      "sender_address": "EXAMPLE1",
      "sender_address_type": "ALPHANUMERIC",
      "usage_type": "ALPHANUMERIC",
      "destination_countries": [
        "AU"
      ],
      "reason": "This is my reason 1",
      "label": "This is my label 1",
      "account_id": "my_account",
      "created_date": "2023-08-04T04:21:55.958Z",
      "last_modified_date": "2023-08-04T04:21:55.958Z"
    },
    {
      "id": "365dd65f-7101-46cd-8e79-e49c5620eb15",
      "sender_address": "EXAMPLE2",
      "sender_address_type": "ALPHANUMERIC",
      "usage_type": "ALPHANUMERIC",
      "destination_countries": [
        "AU"
      ],
      "reason": "This is my reason 2",
      "label": "This is my label 2",
      "account_id": "my_account",
      "created_date": "2023-08-14T04:21:55.958Z",
      "last_modified_date": "2023-08-14T04:21:55.958Z"
    },
    {
      "id": "4a9cb0f4-f383-40b5-84dc-bbb6a3b210dd",
      "sender_address": "61491570156",
      "sender_address_type": "INTERNATIONAL",
      "usage_type": "OWN_NUMBER",
      "destination_countries": [
        "AU"
      ],
      "reason": "This is my reason 3",
      "label": "This is my label 3",
      "account_id": "my_account",
      "created_date": "2023-08-24T04:21:55.958Z",
      "last_modified_date": "2023-08-24T04:21:55.958Z",
      "expiry": "2024-08-03T04:21:55.958Z",
      "display_status": "APPROVED"
    }
  ],
  "pagination": {
    "page_size": 20,
    "next_token": "UWFTeXNBZGRyMSN8JEAsdmVuZG9ySWRUZXN0MSN8JEAsYWNjb3VudElkVGVzdDI="
  }
}
```
### 400 response schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `message` | string | Yes |  |  |
| `details` | array of string | Yes | Additional error detail messages. |  |

### Example 400 response

```json
{
  "message": "Request failed to parse correctly. Please ensure input is valid and try again.",
  "details": [
    "Failed to parse message body."
  ]
}
```
### 403 response schema

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `message` | string | Yes |  |  |

### Example 403 response

```json
{
  "message": "Invalid authentication credentials"
}
```

## Examples

### cURL

```bash
curl -X GET "https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/?sender_address=EXAMPLE&sender_address_type=ALPHANUMERIC&usage_type=ALPHANUMERIC&include_related_accounts=true&expiry_status=EXPIRED&page_size=20&token=eyJwYWdlIjoyfQ" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json"
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/addresses/?sender_address=EXAMPLE&sender_address_type=ALPHANUMERIC&usage_type=ALPHANUMERIC&include_related_accounts=true&expiry_status=EXPIRED&page_size=20&token=eyJwYWdlIjoyfQ", {
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

- **400**: Bad request
- **401**: Unauthorized
- **403**: Forbidden

## Related endpoints

- [Get sender address by id](get-sender-address-by-id.md)
- [Update My Own Number Label](update-sender-address-using-patch.md)
- [Re-verify Sender Address](re-verify-sender-address-using-post.md)
- [Delete Sender Address](delete-sender-address-using-delete.md)
- [Send messages](../messages/send-messages.md)

## Specification details

Retrieve all **approved sender addresses** currently registered to your account.

Each item's `id` is the **sender address** UUID. Use this UUID to get, update, re-verify, or delete a sender. It is different from the request UUID returned when you created the sender.


[← Source Address](index.md)
