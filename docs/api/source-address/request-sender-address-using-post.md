# Request a Sender Address

Submit an alpha tag or personal number for registration as an SMS sender ID.

| | |
|---|---|
| **Service** | [Source Address](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/requests` |
| **Operation ID** | `requestSenderAddressUsingPOST` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `201` — Created |
| **Required** | `sender_address`, `sender_address_type`, `usage_type`, `destination_countries`, `reason` |

### Minimal request

```json
{
  "sender_address": "EXAMPLE",
  "sender_address_type": "ALPHANUMERIC",
  "usage_type": "ALPHANUMERIC",
  "destination_countries": [
    "AU"
  ],
  "reason": "{\n  \"useCase\":\"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY\",\n  \"description\":\"bal bla\",\n  \"email\":\"xample@email.com\",\n  \"australianGovernmentAgencyOrEntityName\":\"bla bla\",\n  \"statement\":\"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case.\"\n}\n",
  "label": "label"
}
```

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Parameters

### Path parameters

None.

### Query parameters

None.

### Header parameters

None.

## Request body

- **Content-Type:** `application/json`
- **Required:** true
- **Description:** Request body.

### Variant 1: `RequestAlphaTag`

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `sender_address` | string | Yes | The Sender Address to be requested |  |
| `sender_address_type` | string | Yes |  | Enum: `ALPHANUMERIC` |
| `usage_type` | string | Yes |  | Enum: `ALPHANUMERIC` |
| `destination_countries` | array of string | Yes | list of 2-character ISO country codes |  |
| `reason` | string | Yes |  |  |
| `label` | string | No |  |  |

### Variant 2: `RequestVerificationCode`

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `sender_address` | string | Yes | The Own Number to be verified |  |
| `sender_address_type` | string | Yes |  | Enum: `INTERNATIONAL` |
| `usage_type` | string | Yes |  | Enum: `OWN_NUMBER` |
| `destination_countries` | array of string | Yes | list of 2-character ISO country codes |  |
| `reason` | string | Yes |  |  |
| `label` | string | No |  |  |

### Example for RequestAlphaTag

```json
{
  "sender_address": "EXAMPLE",
  "sender_address_type": "ALPHANUMERIC",
  "usage_type": "ALPHANUMERIC",
  "destination_countries": [
    "AU"
  ],
  "reason": "{\n  \"useCase\":\"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY\",\n  \"description\":\"bal bla\",\n  \"email\":\"xample@email.com\",\n  \"australianGovernmentAgencyOrEntityName\":\"bla bla\",\n  \"statement\":\"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case.\"\n}\n",
  "label": "label"
}
```

### Example for RequestVerificationCode

```json
{
  "sender_address": "+61401234567",
  "sender_address_type": "INTERNATIONAL",
  "usage_type": "OWN_NUMBER",
  "destination_countries": [
    "AU"
  ],
  "reason": "my personal number",
  "label": "label"
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | Created | `AlphaTagRequestItem` or `VerificationCodeRequestItem` |
| 400 | Bad Request | None |
| 401 | Unauthorized | None |
| 403 | Forbidden | None |
| 409 | Conflict | None |

### 201 response schema — `AlphaTagRequestItem`

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `id` | string (uuid) | No | Primary ID of the record |  |
| `sender_address` | string | No | The Alpha tag to be requested |  |
| `sender_address_type` | string | No | The Sender Address Type | Enum: `ALPHANUMERIC` |
| `usage_type` | string | No | The Sender Address Usage Type | Enum: `ALPHANUMERIC` |
| `destination_countries` | array of string | No | list of 2-character ISO country codes this sender address applies to |  |
| `reason` | string | No |  |  |
| `label` | string | No |  |  |
| `status` | string | No |  | Enum: `OPEN`, `PENDING`, `REJECTED`, `APPROVED` |
| `account_id` | string | No |  |  |
| `created_date` | string (date-time) | No |  |  |
| `last_modified_date` | string (date-time) | No |  |  |
### 201 response schema — `VerificationCodeRequestItem`

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `id` | string (uuid) | No | Primary ID of the record |  |
| `sender_address` | string | No | The Own Number to be requested |  |
| `sender_address_type` | string | No | The Sender Address Type | Enum: `INTERNATIONAL` |
| `usage_type` | string | No | The Sender Address Usage Type | Enum: `OWN_NUMBER` |
| `destination_countries` | array of string | No | list of 2-character ISO country codes this sender address applies to |  |
| `reason` | string | No |  |  |
| `label` | string | No |  |  |
| `status` | string | No |  | Enum: `PENDING`, `REJECTED`, `APPROVED` |
| `account_id` | string | No |  |  |
| `created_date` | string (date-time) | No |  |  |
| `last_modified_date` | string (date-time) | No |  |  |

### Example 201 response 1

```json
{
  "id": "6f79a12e-14f1-4776-adc0-5c5e48a999b7",
  "sender_address": "EXAMPLE",
  "sender_address_type": "ALPHANUMERIC",
  "usage_type": "ALPHANUMERIC",
  "destination_countries": [
    "AU"
  ],
  "reason": "{\n  \"useCase\":\"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY\",\n  \"description\":\"bal bla\",\n  \"email\":\"xample@email.com\",\n  \"australianGovernmentAgencyOrEntityName\":\"bla bla\",\n  \"statement\":\"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case.\"\n}\n",
  "label": "label",
  "status": "OPEN",
  "account_id": "XYZ_ExampleAccount",
  "created_date": "2023-10-25T14:15:22Z",
  "last_modified_date": "2023-10-25T14:15:22Z"
}
```

### Example 201 response 2

```json
{
  "id": "6f79a12e-14f1-4776-adc0-5c5e48a999b8",
  "sender_address": "+61401234567",
  "sender_address_type": "INTERNATIONAL",
  "usage_type": "OWN_NUMBER",
  "destination_countries": [
    "AU"
  ],
  "reason": "my personal number",
  "label": "label",
  "status": "PENDING",
  "account_id": "XYZ_ExampleAccount",
  "created_date": "2023-10-24T14:15:22Z",
  "last_modified_date": "2023-10-24T14:15:22Z"
}
```

## Examples

### cURL

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/requests" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
  "sender_address": "EXAMPLE",
  "sender_address_type": "ALPHANUMERIC",
  "usage_type": "ALPHANUMERIC",
  "destination_countries": [
    "AU"
  ],
  "reason": "{\n  \"useCase\":\"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY\",\n  \"description\":\"bal bla\",\n  \"email\":\"xample@email.com\",\n  \"australianGovernmentAgencyOrEntityName\":\"bla bla\",\n  \"statement\":\"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case.\"\n}\n",
  "label": "label"
}'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/messaging/numbers/sender_address/requests", {
  method: "POST",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    sender_address: "EXAMPLE",
    sender_address_type: "ALPHANUMERIC",
    usage_type: "ALPHANUMERIC",
    destination_countries: [
      "AU"
    ],
    reason: "{\n  \"useCase\":\"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY\",\n  \"description\":\"bal bla\",\n  \"email\":\"xample@email.com\",\n  \"australianGovernmentAgencyOrEntityName\":\"bla bla\",\n  \"statement\":\"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case.\"\n}\n",
    label: "label"
  })
});

const result = await response.json();
console.log(result);
```

## Error handling

- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **409**: Conflict

## Related endpoints

- [Get status of a sender address request](get-status-of-sender-address-request.md)
- [Submitting a verification code](submitting-verification-code-post.md)
- [Get all approved sender addresses](get-all-approved-sender-addresses.md)
- [Send messages](../messages/send-messages.md)

## Specification details

Submit a **sender address request** to register a new Sender ID.

The `id` in the response is the **request** UUID. Use it only with request endpoints (get status, submit verification code). It is **not** the approved sender address UUID. After approval, use **Get all approved sender addresses** to get the address `id` needed to delete or manage the sender.

When making a request to this endpoint, you will always need to specify ```sender_address_type``` and ```usage_type``` parameters. The following table shows the acceptable values and combinations for these parameters:
  | Sender ID       | sender_address_type | usage_type     |
  |---              |---                  |---             |
  | Alpha tag       | `ALPHANUMERIC`      | `ALPHANUMERIC` |
  | Personal number | `INTERNATIONAL`     | `OWN_NUMBER`   | 

The other parameters required for your request will depend on the type of Sender ID you are registering.

### Sender ID is an Alpha Tag
The following parameters are used when registering an alpha tag as a Sender ID:
  - ```sender_address:``` **(Required)**. The alphanumeric string that you wish register as an alpha tag. This parameter is case insensitive. If this alpha tag already exists on your account, you will receive a conflict error message.
  - ```destination_countries:``` **(Required)**. The countries that you wish to register the alpha tag for use in, in two-character ISO 3166 format. Currently AD, AI, AL, AS, AT, AW, BA, BB, BH, BW, CD, CH, CK, CY, DE, DJ, DK, DM, EE, ES, FI, FJ, FM, FO, FR, GB, GD, GG, GI, GL, GM, GQ, GR, GY, IL, IM, IS, JE, JM, JP, KI, KY, LA, LI, LS, LT, LU, LV, MC, ME, MH, MO, MR, MS, MT, MV, NC, NF, NL, NO, NR, NU, PF, PM, PT, SB, SC, SE, SH, SL, SM, ST, TC, TD, TO, VC, VG and WS are supported.
  - ```sender_address_type:``` **(Required)**. For alpha tags this is always ALPHANUMERIC
  - ```usage_type:``` **(Required)**. For alpha tags this is always ALPHANUMERIC
  - ```label:``` **(Optional)**. A reference name for the sender ID to allow you to easily track it.
  - ```reason:``` **(Required)**. This is a specifically formatted string made up of the following sub-items (all of which are required):

    - `useCase:` one of the following:
      - `SOLE_TRADER_NAME`
      - `COMPANY_NAME`
      - `PARTNERSHIP_NAME`
      - `REGISTERED_TRUST_NAME`
      - `CO_OPERATIVE_NAME`
      - `INDIGENOUS_CORPORATION_NAME`
      - `REGISTERED_ORGANISATION_NAME`
      - `PERSONAL_NAME`
      - `AUSTRALIAN_TRADEMARK`
      - `INTERNATIONAL_TRADEMARK`
      - `AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY`
      - `FOREIGN_GOVERNMENT_AGENCY_OR_ENTITY`
      - `PRODUCT_OR_SERVICE_NAME`
      - `ACRONYM_INITIALISM`
      - `CONTRACTION_OF_NAME`
      - `OTHER`
    - `description:` A description used if OTHER was selected as the use case. Limited to 200 characters.

    - `email:` The preferred contact email for our approval team when additional details are required.

    - `australianGovernmentAgencyOrEntityName:` The name of your organisation.

    - `abn:` Your organisation’s Australian Business Number

    - `statement:` A legal declaration
      - If applying for your own business: "We are authorized to use the Sender ID with a valid use case."
      - If applying on behalf of a third-party entity: "We are authorized to use the Sender ID on behalf of [full entity name of sender] with a valid use case."

The reason parameter must contain all the above items. A well formatted reason looks like the following:
  - "reason": "{\n&nbsp;&nbsp;\\"useCase\\":\\"AUSTRALIAN_GOVERNMENT_AGENCY_OR_ENTITY\\",\n&nbsp;&nbsp;\\"description\\":\\"bal bla\\",\n&nbsp;&nbsp;\\"email\\":\\"example@email.com\\",\n&nbsp;&nbsp;\\"australianGovernmentAgencyOrEntityName\\":\\"bla bla\\",\n&nbsp;&nbsp;\\"statement\\":\\"We are authorised to use the Sender ID on behalf of [full entity name of sender] with a valid use case.\\"\n}\n"

### Sender ID is a Personal Number
The following parameters are used when registering a personal mobile phone number as a Sender ID: 

  - ```sender_address:``` **(Required)**. The phone number that you wish register as a personal number. This number must be in E.164. If this number is already registered to an account, you will receive a conflict error message. 

  - ```destination_countries:``` **(Required)**. The country of the number that you wish to register, in two-character ISO 3166 format. Refer to the **Types of Sender ID** section for a list of currently supported countries. 

  - ```sender_address_type:``` **(Required)**. For personal numbers this is always INTERNATIONAL 

  - ```usage_type:``` **(Required)**. For personal numbers this is always OWN_NUMBER 

  - ```label:``` **(Optional)**. A reference name for the sender ID to allow you to easily track it. 

  - ```Reason:``` **(Required)**. A string describing why you wish to register the number as a Sender ID. Limited to 200 characters.


[← Source Address](index.md)
