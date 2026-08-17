# Dedicated Numbers

Find, assign, inspect, update, and release dedicated numbers for your Sinch account. This paid feature must be enabled on your account.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com/` |
| APAC instance | `https://au.app.api.sinch.com/` |

## Choose an endpoint

| Goal | Endpoint |
|------|----------|
| Search the available number inventory | [Get numbers](get-numbers.md) |
| Inspect one number before assigning it | [Get number by ID](get-number-by-id.md) |
| List numbers already assigned to your account | [Get assigned numbers](get-assigned-numbers.md) |
| View an assignment's label and metadata | [Get assignment](get-assignment.md) |
| Assign an available number to your account | [Create assignment](create-assignment.md) |
| Change an assignment's label or metadata | [Update assignment](update-assignment.md) |
| Release a number from your account | [Delete assignment](delete-assignment.md) |

Typical lifecycle: search → inspect → assign → manage → release.

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Get numbers](get-numbers.md) | `GET` | `/v1/messaging/numbers/dedicated/` | Get numbers |
| [Get number by ID](get-number-by-id.md) | `GET` | `/v1/messaging/numbers/dedicated/{id}` | Get number by ID |
| [Get assignment](get-assignment.md) | `GET` | `/v1/messaging/numbers/dedicated/{numberId}/assignment` | Get assignment |
| [Create assignment](create-assignment.md) | `POST` | `/v1/messaging/numbers/dedicated/{numberId}/assignment` | Create assignment |
| [Delete assignment](delete-assignment.md) | `DELETE` | `/v1/messaging/numbers/dedicated/{numberId}/assignment` | Delete assignment |
| [Update assignment](update-assignment.md) | `PATCH` | `/v1/messaging/numbers/dedicated/{numberId}/assignment` | Update assignment |
| [Get assigned numbers](get-assigned-numbers.md) | `GET` | `/v1/messaging/numbers/dedicated/assignments` | Get assigned numbers |

## Specification details

The Numbers API allows your to purchase, provision and configure the dedicated numbers assigned to your Sinch account. 

To learn more about the benefits of dedicated numbers, and their use cases, visit our [feature page](https://support.app.sinch.com/hc/en-us/articles/10526389880207-Dedicated-numbers).

This is a paid feature and must be enabled on your account. Please contact [support@app.sinch.com](mailto:support@app.sinch.com) or your account manager.

## Concepts

This API allows you to purchase and assign to your account a number from a pool of dedicated numbers. Dedicated numbers are priced differently according to their classification.

The following is the system by which we classify dedicated numbers. 

| Pattern Type | Gold|  Silver |
|---|---|---|
| Same Number  |  Six of same (e.g. 999999) | Five of same (e.g. 999991 or 199999)  | 
| Sequence  |  Six in sequence (e.g. 234567, or 765432) | Five in sequence (e.g. 245678, 456782, or 287654)  |
|  Triplets |  Two identical (e.g. 123123) or two double (e.g. 444666) | Identical pairs within triplets (e.g. 004008, or 400800), one identical and one in sequence (e.g. 444789, or 345777), or mirror image (e.g. 468864)| 
|Pair|Three identical (e.g. 454545)|Three non-identical (e.g. 447700) or three in sequence (e.g. 232425, or 090807)|

Any numbers that do not meet the criteria for Gold or Silver are classified as Bronze.

For pricing on dedicated numbers please refer to the Numbers page in our Hub web portal, or speak with your Sinch Account Manager.

[← All services](../index.md)
