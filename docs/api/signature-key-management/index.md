# Signature Key Management

Manage the keys Sinch uses to sign webhook requests so your application can verify that each request came from Sinch.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com/` |
| APAC instance | `https://au.app.api.sinch.com/` |

## Choose an endpoint

| Goal | Endpoint |
|------|----------|
| Create a key pair | [Create signature key](create-signature-key.md) |
| List all signature keys | [Get signature key list](get-signature-key-list.md) |
| Inspect one key | [Get signature key detail](get-signature-key-detail.md) |
| Delete one key | [Delete signature key](delete-signature-key.md) |
| Make a key active | [Enable signature key](enable-signature-key.md) |
| Retrieve the active key | [Get enabled signature key](get-enabled-signature-key.md) |
| Disable the active key | [Disable the current enabled signature key](disable-the-current-enabled-signature-key.md) |

Create a key, store its returned public key, and then enable it. Only one signature key can be enabled at a time.

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Get signature key list](get-signature-key-list.md) | `GET` | `/v1/iam/signature_keys` | Get signature key list |
| [Create signature key](create-signature-key.md) | `POST` | `/v1/iam/signature_keys` | Create signature key |
| [Get signature key detail](get-signature-key-detail.md) | `GET` | `/v1/iam/signature_keys/{key_id}` | Get signature key detail |
| [Delete signature key](delete-signature-key.md) | `DELETE` | `/v1/iam/signature_keys/{key_id}` | Delete signature key |
| [Enable signature key](enable-signature-key.md) | `PATCH` | `/v1/iam/signature_keys/enabled` | Enable signature key |
| [Get enabled signature key](get-enabled-signature-key.md) | `GET` | `/v1/iam/signature_keys/enabled` | Get enabled signature key |
| [Disable the current enabled signature key](disable-the-current-enabled-signature-key.md) | `DELETE` | `/v1/iam/signature_keys/enabled` | Disable the current enabled signature key |

## Specification details

As a Sinch customer, you want to be able to ensure that webhooks are coming from Sinch and not from a 3rd party. Since these are calls to your own system, you should be provided with an extra level of security when calling your resources.

The Sinch Signature Key API provides a number of endpoints for managing key used to sign each unique request to ensure security and the requests can't (easily) be spoofed. This is similar to using HMAC in your outbound messaging (rather than HTTP Basic).

The Signature Key API provides seven main endpoints:

- `Create signature key` Create a new signature key for signature verification in webhooks.
- `Get signature key detail` Retrieve the current detail of a signature key using the key_id returned in the `create signature key` endpoint.
- `Delete signature key` Delete a signature key using the key_id returned in the `create signature key` endpoint.
- `Get signature key list` Retrieve the paginated list of signature keys.
- `Enable signature key` Enable a signature key using the key_id returned in the `create signature key` endpoint.
- `Get enabled signature key` Retrieve the current enabled signature key.
- `Disable an enabled signature key` Disable the current enabled signature key.

[← All services](../index.md)
