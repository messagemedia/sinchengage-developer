# Number Authorisation

Manage the numbers your account must not message, check authorisation before sending, and review the current blacklist. Sinch can add numbers automatically when recipients reply with opt-out keywords.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com/` |
| APAC instance | `https://au.app.api.sinch.com/` |

## Choose an endpoint

| Goal | Endpoint |
|------|----------|
| Check whether one or more numbers are authorised for messaging | [Check if one or several numbers are currently blacklisted](check-if-one-or-several-numbers-are-currently-blacklisted.md) |
| Review the blacklist, 100 numbers at a time | [List all blocked numbers](list-all-blocked-numbers.md) |
| Add up to 10 numbers to the blacklist | [Add one or more numbers to your blacklist](add-one-or-more-numbers-to-your-blacklist.md) |
| Remove one number from the blacklist | [Remove a number from the blacklist](remove-a-number-from-the-blacklist.md) |

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Check if one or several numbers are currently blacklisted](check-if-one-or-several-numbers-are-currently-blacklisted.md) | `GET` | `/v1/number_authorisation/is_authorised/{numbers}` | Check if one or several numbers are currently blacklisted |
| [List all blocked numbers](list-all-blocked-numbers.md) | `GET` | `/v1/number_authorisation/mt/blacklist` | List all blocked numbers |
| [Add one or more numbers to your blacklist](add-one-or-more-numbers-to-your-blacklist.md) | `POST` | `/v1/number_authorisation/mt/blacklist` | Add one or more numbers to your blacklist |
| [Remove a number from the blacklist](remove-a-number-from-the-blacklist.md) | `DELETE` | `/v1/number_authorisation/mt/blacklist/{number}` | Remove a number from the blacklist |

## Specification details

The number authorisation API allows you to manage your blacklists. Sinch automatically adds numbers to your blacklist if people send one of the opt-out keywords in response to one of your messages.

This is a legal requirement. If you decide to handle the legal compliance yourself, calls to this endpoint will not affect your messages.

[← All services](../index.md)
