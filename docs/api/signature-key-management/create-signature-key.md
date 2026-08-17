# Create signature key

Create a public/private key pair for signing and verifying webhook requests. Store the returned public key, then enable the key before use.

| | |
|---|---|
| **Service** | [Signature Key Management](index.md) |
| **Method** | `POST` |
| **URL** | `https://eu.app.api.sinch.com/v1/iam/signature_keys` |
| **Operation ID** | `CreateSignatureKey` |
| **Authentication** | Basic Auth, HMAC Auth |
| **Success** | `201` — The new signature key has been created. |
| **Required** | `Accept` header; JSON request body |

## Authentication

- **Basic Auth**: HTTP Basic authentication using your API key as the username and API secret as the password. See the Basic Authentication guide tag.
- **HMAC Auth**: HMAC request signing. Place the full `hmac username=...` credential in the Authorization header. See the HMAC Authentication guide tag.

## Parameters

### Path parameters

None.

### Query parameters

None.

### Header parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Accept` | string | Yes | Requested response media type. |

## Request body

- **Content-Type:** `application/json`
- **Required:** true

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `digest` | string | Yes | |
| `cipher` | string | Yes | |

### Example request body

```json
{
  "digest": "SHA224",
  "cipher": "RSA"
}
```

## Responses

| Status | Description | Schema |
|--------|-------------|--------|
| 201 | The new signature key has been created. | `Createsignaturekeyresponse` |
| 400 | Unexpected error in API call. See HTTP response body for details. | `Enablesignaturekey400response` |
| 401 | No valid authentication details were provided | — |
| 403 | Unexpected error in API call. See HTTP response body for details. | `Disablethecurrentenabledsignaturekey.403response` |

### 201 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `key_id` | string | Yes | |
| `public_key` | string | Yes | |
| `cipher` | string | Yes | |
| `digest` | string | Yes | |
| `created` | string | Yes | |
| `enabled` | boolean | Yes | |

### 400 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |
| `details` | array of strings | Yes | Additional error detail messages. |

### 403 response schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `message` | string | Yes | |

## Examples

### cURL

```bash
curl -X POST "https://eu.app.api.sinch.com/v1/iam/signature_keys" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"digest":"SHA224","cipher":"RSA"}'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://eu.app.api.sinch.com/v1/iam/signature_keys", {
  method: "POST",
  headers: {
    "Authorization": "Basic " + btoa("API_KEY:API_SECRET"),
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    digest: "SHA224",
    cipher: "RSA"
  })
});

const key = await response.json();
console.log(key);
```

## Error handling

- **400 Bad Request**: Unexpected error in API call. See HTTP response body for details. The `details` array contains additional error detail messages.
- **401 Unauthorized**: No valid authentication details were provided. Verify Basic or HMAC credentials.
- **403 Forbidden**: Unexpected error in API call. See HTTP response body for details.

## Related endpoints

- [Enable signature key](enable-signature-key.md)
- [Get signature key detail](get-signature-key-detail.md)
- [Delete signature key](delete-signature-key.md)

## Specification details

This will create a key pair:

- The `private key` stored in Sinch is used to create the signature.
- The `public key` is returned and stored at your side to verify the signature in webhooks.

You need to enable your signature key after creating.

The most basic body has the following structure:

```javascript
{
    "digest": "SHA224",
    "cipher": "RSA"
}
```

- `digest` is used to hash the message. The valid values for digest type are: SHA224, SHA256, SHA512
- `cipher` is used to encrypt the hashed message. The valid value for cipher type is: RSA

A successful request for the `create signature key` endpoint will return a response body as follows:

```javascript
{
    "key_id": "7ca628a8-08b0-4e42-aeb8-960b37049c31",
    "public_key": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTIxtRyT5CuOD74r7UCT+AKzWNxvaAP9myjAqR7+vBnJKEvoPnmbKTnm6uLlxutnMbjKrnCCWnQ9vtBVnnd+ElhwLDPADfMcJoOqwi7mTcxucckeEbBsfsgYRfdacxgSZL8hVD1hLViQr3xwjEIkJcx1w3x8npvwMuTY0uW8+PjwIDAQAB",
    "cipher": "RSA",
    "digest": "SHA224",
    "created": "2018-01-18T10:16:12.364Z",
    "enabled": false
}
```

The response body of a successful POST request to the `create signature key` endpoint will contain six properties:

- `key_id` will be a 36 character UUID which can be used to enable, delete or get the details.
- `public_key` is used to decrypt the signature.
- `cipher` same as cipher in request body.
- `digest` same as digest in request body.
- `created` is the created date.
- `enabled` is false for the new signature key. You can use the `enable signature key` endpoint to set this field to true.

[← Signature Key Management](index.md)
