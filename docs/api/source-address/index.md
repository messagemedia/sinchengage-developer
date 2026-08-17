# Source Address

The Source Address API lets you request SMS sender IDs and track their approval status.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com/` |
| APAC instance | `https://au.app.api.sinch.com/` |

## Choose an endpoint

| Goal | Endpoint |
|------|----------|
| Register an alpha tag or personal number | [Request a Sender Address](request-sender-address-using-post.md) |
| Submit the SMS code for a personal number | [Submitting a verification code](submitting-verification-code-post.md) |
| Check a registration request | [Get status of a sender address request](get-status-of-sender-address-request.md) |
| List approved sender addresses and obtain address UUIDs | [Get all approved sender addresses](get-all-approved-sender-addresses.md) |
| Retrieve, relabel, reverify, or remove an approved sender | [Get sender address by id](get-sender-address-by-id.md) |

Request UUIDs identify applications; approved sender address UUIDs identify senders. Use [Get all approved sender addresses](get-all-approved-sender-addresses.md) after approval to obtain the UUID required by address-management endpoints.

## Endpoints

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Request a Sender Address](request-sender-address-using-post.md) | `POST` | `/v1/messaging/numbers/sender_address/requests` | Request a Sender Address |
| [Submitting a verification code](submitting-verification-code-post.md) | `POST` | `/v1/messaging/numbers/sender_address/requests/{id}/verify` | Submitting a verification code |
| [Re-verify Sender Address](re-verify-sender-address-using-post.md) | `POST` | `/v1/messaging/numbers/sender_address/addresses/{id}/reverify` | Re-verify Sender Address |
| [Get status of a sender address request](get-status-of-sender-address-request.md) | `GET` | `/v1/messaging/numbers/sender_address/requests/{id}` | Get status of a sender address request |
| [Get all approved sender addresses](get-all-approved-sender-addresses.md) | `GET` | `/v1/messaging/numbers/sender_address/addresses/` | Get all approved sender addresses |
| [Get sender address by id](get-sender-address-by-id.md) | `GET` | `/v1/messaging/numbers/sender_address/addresses/{id}` | Get sender address by id |
| [Update My Own Number Label](update-sender-address-using-patch.md) | `PATCH` | `/v1/messaging/numbers/sender_address/addresses/{id}` | Update My Own Number Label |
| [Delete Sender Address](delete-sender-address-using-delete.md) | `DELETE` | `/v1/messaging/numbers/sender_address/addresses/{id}` | Delete Sender Address |

## Specification details

The source address API provides several endpoints for you to request an SMS sender ID and track its approval status.

### Sender address request vs sender address

This API uses two different resources, each with its own UUID:

| | Sender address **request** | Approved sender **address** |
|---|----------------------------|-----------------------------|
| What it is | Your registration / verification application | The approved sender ID on your account |
| Path | `/v1/messaging/numbers/sender_address/requests` | `/v1/messaging/numbers/sender_address/addresses` |
| `id` returned by | **Request a Sender Address** (`POST .../requests`) | **Get all approved sender addresses** (`GET .../addresses/`) |
| Use that `id` for | Get request status, submit a verification code | Get, update, re-verify, or **delete** the sender |

The request `id` and the address `id` are **not the same**. After a sender is approved, call **Get all approved sender addresses** to obtain the address `id` before deleting or managing it. Using the request `id` on address endpoints (for example delete) returns `404 Not found`.

**What is Trusted Sender ID?**

Simply put, a sender ID is whatever you send a text message from. This is typically either a phone number, or a string of alphanumeric characters (commonly referred to as an "Alpha Tag").

With regulations surrounding SMS becoming much stricter all over the world in an effect to combat scam SMS messages, Sinch is working on "Trusted Sender ID" a concept that allows customers to request a Sender ID and have it verified.

Currently, Trusted Sender ID supports two types of Sender ID: Alpha Tags and Personal ("Own") Numbers. It will likely be extended to support additional number types, such as TFN and 10DLC where additional registration, (external) verification, and overall account allowlist of numbers will be required.

### Alpha Tag
  Sending messages from your brand name is particularly ideal for SMS marketing and two-factor authentication, as it increases recognition and trust. There are, however, a few considerations to be aware of. 
  
  Alpha tags are made up of 3-11 letters and/or numbers. Alpha tags must be registered and approved before sending and must have clear relevancy to your business and/or use case.
  
  Alpha Tags appear as the "From" number when you receive messages.
  
  A good alpha tag meets at least one of the following valid use cases: 
  * Business names
  * Trademark names    
  * Product or service name
  * an acronym, initialism, or contraction of your entity
  
  In addition to the requirements around clearly relating to the business, we typically advise the following for alpha tags to ensure maximum compatibility with the various carriers:
  * 6-11 characters long
  * Only contains characters from the following sets:
  * A-Z
  * a-z
  * 0-9
  * _ (underscore)
  * \- (hyphen)
  
  Alpha Tags can currently be registered through the Source Address API for the following countries: ```AD```, ```AI```, ```AL```, ```AS```, ```AT```, ```AU```, ```AW```, ```BA```, ```BB```, ```BH```, ```BW```, ```CD```, ```CH```, ```CK```, ```CY```, ```DE```, ```DJ```, ```DK```, ```DM```, ```EE```, ```ES```, ```FI```, ```FJ```, ```FM```, ```FO```, ```FR```, ```GB```, ```GD```, ```GG```, ```GI```, ```GL```, ```GM```, ```GQ```, ```GR```, ```GY```, ```IL```, ```IM```, ```IS```, ```JE```, ```JM```, ```JP```, ```KI```, ```KY```, ```LA```, ```LI```, ```LS```, ```LT```, ```LU```, ```LV```, ```MC```, ```ME```, ```MH```, ```MO```, ```MR```, ```MS```, ```MT```, ```MV```, ```NC```, ```NF```, ```NL```, ```NO```, ```NR```, ```NU```, ```PF```, ```PM```, ```PT```, ```SB```, ```SC```, ```SE```, ```SH```, ```SL```, ```SM```, ```ST```, ```TC```, ```TD```, ```TO```, ```VC```, ```VG``` and ```WS```
  
  To register an Alpha Tag as a sender ID you must:
  1. Make a request to the **Request a Sender Address** endpoint
  2. Wait for the alpha tag to be approved. The status of the alpha tag can be monitored using the **Get status of a sender address request** endpoint
  
  Once the alpha tag has been approved, you can begin using it as a Sender ID for SMS messages.

  ### Personal Number
  A personal number, or "My Own Number", is a number that you own rather than one provided to you by Sinch. Typically, this is your personal mobile phone number. You may wish to register this number for use with our service so that you can easily send messages from a number already associated with your organisation.
  
  Before you can send messages using your own number, you need to verify that you have a right to use that number. Ensuring you have a right to use a phone number is an important regulatory requirement, aiming to prevent scam, spam, and misuse of messaging services.

  Personal numbers can currently be registered through the Source Address API for the following countries: ```AT```, ```AU```, ```CH```, ```CY```, ```DE```, ```DK```, ```EE```, ```ES```, ```FI```, ```GB```, ```HR```, ```IE```, ```IT```, ```LT```, ```LU```, ```LV```, ```MT```, ```NL```, ```NO```, ```PT```, ```SE```, and ```SI```

  To register a personal number as a Sender ID you must:
  1. Make a request to the **Request a Sender Address** endpoint (store the **request** UUID for verification)
  2. A unique verification code will be sent to the requested number
  3. Make a request to the **Submitting a Verification Code** endpoint, using the verification code that was sent in the previous step. A 200 OK response will indicate the number has been verified and is ready for use.
  4. To delete or manage the sender later, call **Get all approved sender addresses** and use the **address** UUID from that response (different from the request UUID in step 1).

  ⚠️ Own numbers need to be re-verified every 12 months. You will be notified by email that verification of your number is about to expire.

  ### Requesting a Source Address on behalf of a sub-account
  By default, all requests made through the API are made on behalf of the account that the API keys used to authorize the request were made on. API keys created on a parent account can request a source address on behalf of a sub-account. To do this, include a header key ```Account``` with the sub-account ID as the value. For example: 
  ```Account: mySubAccount```

  **Example request with Request a Sender Address from a sub-account**
  ```plain
  POST /v1/messaging/numbers/sender_address/requests HTTP/1.1
  Host: eu.app.api.sinch.com
  Accept: application/json
  Content-Type: application/json
  Authorization: Basic dGhpc2lzYWtleTp0aGlzaXNhc2VjcmV0Zm9ybW1iYXNpY2F1dGhyZXN0YXBp
  Account: mySubAccount
  {
    "sender_address": "+61341234131",
    "sender_address_type": "INTERNATIONAL",
    "usage_type": "OWN_NUMBER",
    "destination_countries": [
        "AU"
    ],
    "reason": "I confirm that my business has a valid use case",
    "label": "my number sample"
  } 
  ```
  *Note: The use of the Account header key applies to all Source Address endpoints.*


[← All services](../index.md)
