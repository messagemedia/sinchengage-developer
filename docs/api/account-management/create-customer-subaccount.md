# Create customer subaccount

Create a new sub-account with a user attached so the sub-account can start sending messages from the Hub.

Each of the following account properties is required:

- `company_name`: A human-readable name for the sub-account that appears as the account name in the Hub web portal.
- `timezone`: Timezone for the account. Timezones are used to present datetime in local time in the Hub web portal and in any reports. For example `Australia/Melbourne`, `Pacific/Auckland`.
- `operating_country`: The primary country the account will send messages to. Use one of `AU`, `NZ`, `UK`, or `US`.
- `billing_type`: Always set to `POSTPAID` for this API.
- `user`: Required. Details of the initial admin user on the sub-account.

If `user.email` matches an existing platform user, they are added to the account and sent an invitation email. If the email is new, they receive a welcome email with an activation link. If `user.email` is omitted, no Hub invite is sent.

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
| `Account` | string | No | The account the new sub-account will be created under (its parent). Leave this out to create it directly under your own account (the account your API key belongs to). Set it to nest further down under any account you already manage; naming an account you do not manage is rejected. On this endpoint, `Account` chooses where the new sub-account sits in your hierarchy — it does not mean "send on behalf of" (that is a different use of the same header on the Sub-accounts endpoints). Example: `TestAccount_ABC_0001` |

## Request body

JSON object describing the sub-account and initial admin user.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `company_name` | string | Yes | Company name. Cannot contain the `./` substring. Length 2–200. Used to generate an account unique identifier. |
| `timezone` | string | Yes | IANA timezone name, for example `Australia/Melbourne`. |
| `operating_country` | string | Yes | One of `AU`, `NZ`, `UK`, or `US`. |
| `billing_type` | string | Yes | Always set to `POSTPAID`. |
| `user` | object | Yes | Initial admin user. Required. |
| `user.first_name` | string | Yes | First name. Length 1–40. Cannot have more than one sequential space. |
| `user.last_name` | string | Yes | Last name. Length 1–80. Cannot have more than one sequential space. |
| `user.email` | string | No | Email used to match existing users and to send the invite / welcome email. Omit only if you do not need Hub login or matching. |
| `user.phone` | string | Yes | Phone number starting with `+` and 7–250 digits (AMS limit). Prefer full E.164, for example `+61412345678`. |

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
