# Account Management

The Account Management API is for **reseller** accounts. It allows resellers to add and remove sub-accounts on their primary Sinch Engage account, and to manage Sinch Engage web portal users for those accounts.

This is distinct from sending messages *on behalf of* an existing sub-account, which uses the `Account` header described in the [Sub-accounts](../../guides/sub-accounts.md) guide.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com` |
| APAC instance | `https://au.app.api.sinch.com` |

## Choose an endpoint

| Goal | Endpoint |
|------|----------|
| Create a sub-account with an initial admin user | [Create a sub-account](create-customer-subaccount.md) |
| Add a Sinch Engage user to an existing account | [Create users for an account](create-users-for-account.md) |
| Delete a sub-account | [Delete a sub-account](delete-customer-account.md) |

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Create a sub-account](create-customer-subaccount.md) | `POST` | `/v1/iam/reseller_customers` | Create a new sub-account with an initial admin user |
| [Create users for an account](create-users-for-account.md) | `POST` | `/v1/iam/accounts/{id}/users` | Add a Sinch Engage user to an existing account |
| [Delete a sub-account](delete-customer-account.md) | `DELETE` | `/v1/iam/accounts/{id}` | Permanently delete a sub-account |

## Specification details

These APIs are for **reseller accounts only**. That is how they work today. They are not documented for every account type.

[← All services](../index.md)
