# Create customer subaccount

Create a new sub-account with a user attached so the sub-account can start sending messages from the Hub.

Each of the following account properties is required:

- `company_name`: A human-readable name for the sub-account that appears as the account name in the Hub web portal.
- `timezone`: Timezone for the account. Timezones are used to present datetime in local time in the Hub web portal and in any reports. For example `Australia/Melbourne`, `Pacific/Auckland`.
- `operating_country`: The primary operating country which the account will send messages to. This should be one of: `AU`, `NZ`, `UK`, `US`.
- `billing_type`: This should always be set to `POSTPAID`.
- `user`: Details of the initial admin user on the sub-account.

If the user already exists on the platform they will be added to the account and sent an invitation email. If they do not exist the user will receive a welcome email with an activation link.

| | |
|---|---|
| **Service** | [Account Management](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/iam/reseller_customers` |
| **Operation ID** | `CreateCustomerSubaccount` |
| **Authentication** | Basic Auth, HMAC Auth |

## Authentication

This endpoint supports two authentication methods:

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com` |
| APAC instance | `https://au.app.api.sinch.com` |

## Parameters

### Path parameters

None.

### Query parameters

None.

### Header parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Account` | string | No | Parent account identifier. When present, the new sub-account is created under this account. Example: `TestAccount_ABC_0001` |

## Request body

JSON object describing the sub-account and initial admin user.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `company_name` | string | Yes | Company name. Cannot contain the `./` substring. Length 2–200. Used to generate an account unique identifier. |
| `timezone` | string | Yes | IANA timezone name, for example `Australia/Melbourne`. |
| `operating_country` | string | Yes | ISO-3166 alpha-2 country code. Documentation says this should be one of `AU`, `NZ`, `UK`, or `US`. |
| `billing_type` | string | Yes | Billing type. Should always be `POSTPAID`. Allowed values: `POSTPAID`, `PREPAID`, `PARENT_ALLOCATED`, `PREPAID_MONEY`. |
| `user.first_name` | string | Yes | First name. Length 1–40. Cannot have more than one sequential space. |
| `user.last_name` | string | Yes | Last name. Length 1–80. Cannot have more than one sequential space. |
| `user.email` | string | No | Email address that receives the invite and is used to log in. |
| `user.phone` | string | Yes | Phone number in E.164 format. `+` is mandatory. |

## Responses

| Status | Description |
|--------|-------------|
| 201 | Customer subaccount created |
| 400 | Request parameter is invalid |
| 401 | No valid authentication details were provided |
| 404 | Not found |
| 500 | Server error |

### 201 response

```json
{
  "parent_account": "TestAccount_ABC_0001",
  "account_id": "TestAccount_ABC_0002"
}
```

## Examples

### cURL

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/iam/reseller_customers" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Account: TestAccount_ABC_0001" \
  -d '{
    "company_name": "Subaccount Name",
    "timezone": "Australia/Melbourne",
    "operating_country": "AU",
    "billing_type": "POSTPAID",
    "user": {
      "first_name": "First",
      "last_name": "Last",
      "email": "first.last@email.com",
      "phone": "+61411111111"
    }
  }'
```

[← Account Management](index.md)
