# API reference

Sinch Engage API documentation generated from the OpenAPI specification.

## Messaging

| Service | Description |
|---------|-------------|
| [Messages](messages/index.md) | The Sinch Messages API provides a number of endpoints for building powerful two-way messaging applications. |
| [Delivery Reports](delivery-reports/index.md) | If a callback URL is specified in the submit message request, then changes to the message status, replies received in response to the message or delivery reports received for the message will be pushed via a HTTP POST request. |
| [Replies](replies/index.md) | Endpoints for checking and confirming inbound message replies (MO) received by your account. |

## Numbers

| Service | Description |
|---------|-------------|
| [Source Address](source-address/index.md) | The source address API provides several endpoints for you to request an SMS sender ID and track its approval status. |
| [Number Authorisation](number-authorisation/index.md) | The number authorisation API allows you to manage your blacklists. Sinch automatically adds numbers to your blacklist if people send one of the opt-out keywords in response to one of your messages. |
| [Dedicated Numbers](dedicated-numbers/index.md) | The Numbers API allows your to purchase, provision and configure the dedicated numbers assigned to your Sinch account. |

## Webhooks and security

| Service | Description |
|---------|-------------|
| [Webhooks Management](webhooks-management/index.md) | Webhooks Management API allows you to manage your webhooks configuration. You can subscribe to one or several events, retrieve the webhooks, update them or even delete them if needed. |
| [Signature Key Management](signature-key-management/index.md) | As a Sinch customer, you want to be able to ensure that webhooks are coming from Sinch and not from a 3rd party. |

## Reporting

| Service | Description |
|---------|-------------|
| [Messaging Reports](messaging-reports/index.md) | The Sinch Reports API provides a number of endpoints for running reports of messages sent and received through a Sinch Account. |
| [Short Trackable Links Reports](short-trackable-links-reports/index.md) | Short Trackable Links is a feature available to Messaging API users whereby it automatically and seamlessly shortens any URL to just 22 characters. |

## Contacts

| Service | Description |
|---------|-------------|
| [Contacts](contacts/index.md) | The API provides access to two main resources: Contacts, Lists, and Custom Fields. |
