# Account Management

The Account Management API allows reseller (parent) accounts to add and remove sub-accounts on their primary Sinch Engage account, and to manage Hub web portal users for those accounts.

This is distinct from sending messages *on behalf of* an existing sub-account, which uses the `Account` header described in the [Sub-accounts](../../guides/sub-accounts.md) guide.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com` |
| APAC instance | `https://au.app.api.sinch.com` |

## Choose an endpoint

| Goal | Endpoint |
|------|----------|
| Create a sub-account with an initial admin user | [Create customer subaccount](create-customer-subaccount.md) |
| Add a Hub user to an existing account | [Create users for account](create-users-for-account.md) |
| Delete a sub-account | [Delete customer account](delete-customer-account.md) |

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Create customer subaccount](create-customer-subaccount.md) | `POST` | `/v1/iam/reseller_customers` | Create a new sub-account with an initial admin user |
| [Create users for account](create-users-for-account.md) | `POST` | `/v1/iam/accounts/{id}/users` | Add a Hub user to an existing account |
| [Delete customer account](delete-customer-account.md) | `DELETE` | `/v1/iam/accounts/{id}` | Delete the specified account |

## Specification details

These endpoints were previously published as customer-facing Apiary documentation and are intended primarily for reseller (parent) accounts. Any parent account can call them, but the primary audience is resellers.

[← All services](../index.md)
