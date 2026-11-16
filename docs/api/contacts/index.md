# Contacts

The API provides access to two main resources:

  * **Contacts**: Data associated with the individuals you need to contact.
  * **Lists**: Groups of contacts created for specific purposes.
  * **Custom Fields**: Additional fields that can be tailored to complement the basic contact fields.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com` |
| APAC instance | `https://au.app.api.sinch.com` |
| US instance | `https://us.app.api.sinch.com` |

## Rate limits

Requests that create, update or delete contacts, lists, list memberships or custom fields are rate limited. Requests that only read data (`GET`) are not.

| Limit | Applies to |
|-------|------------|
| **20 requests per second** | Each account. All create, update and delete endpoints below share this limit. |
| **100 requests per second** | All accounts combined. |

When a request is over the limit, the API responds with `429 Too Many Requests` and a `Retry-After` header. The header gives the number of seconds to wait before you retry (always at least 1). The response body uses the standard error format:

```json
{
  "uuid": "025e93d3-051b-43f9-b12e-4b5842228dee",
  "type": "too_many_requests",
  "title": "Rate limit exceeded",
  "detail": "Too many requests, please retry later"
}
```

### Handle 429 responses

- Wait for the number of seconds in `Retry-After`, then send the same request again. Don't retry immediately.
- For bulk work, keep your send rate below 20 requests per second per account instead of relying on retries.
- To add or remove many contacts in a list, use [Add or remove multiple contacts to/from a list](modify-contacts-in-contact-list.md). One request handles many contacts and counts once against the limit.

### Rate-limited endpoints

| Method | Path |
|--------|------|
| `POST` | `/api/v1/contacts/contacts` |
| `PATCH` | `/api/v1/contacts/contacts/{contactId}` |
| `DELETE` | `/api/v1/contacts/contacts/{contactId}` |
| `POST` | `/api/v1/contacts/lists` |
| `PATCH` | `/api/v1/contacts/lists/{listId}` |
| `DELETE` | `/api/v1/contacts/lists/{listId}` |
| `PATCH` | `/api/v1/contacts/lists/{listId}/contacts` |
| `POST` | `/api/v1/contacts/lists/{listId}/contacts/{contactId}` |
| `DELETE` | `/api/v1/contacts/lists/{listId}/contacts/{contactId}` |
| `POST` | `/api/v1/contacts/custom-fields` |
| `PATCH` | `/api/v1/contacts/custom-fields/{customFieldId}` |
| `DELETE` | `/api/v1/contacts/custom-fields/{customFieldId}` |

## Choose an endpoint

### Contacts

| Goal | Endpoint |
|------|----------|
| Browse or filter contacts | [Get contacts page](get-contacts-page.md) |
| Create a contact | [Create a contact](create-contact.md) |
| Retrieve one contact | [Get a single contact](get-contact-by-id.md) |
| Change contact details | [Update a contact](update-contact.md) |
| Delete a contact | [Delete a contact](delete-contact-by-id.md) |

### Lists

| Goal | Endpoint |
|------|----------|
| Browse or filter contact lists | [Get contact lists page](get-contact-lists-page.md) |
| Create a contact list | [Create a contact list](create-contact-list.md) |
| Retrieve one contact list | [Get a single contact list](get-contact-list-by-id.md) |
| Rename or change a contact list | [Update a contact list](update-contact-list.md) |
| Delete a contact list | [Delete a contact list](delete-contact-list-by-id.md) |
| Add or remove contacts in bulk | [Add or remove multiple contacts to/from a list](modify-contacts-in-contact-list.md) |
| Add one contact to a list | [Add contact to a list](add-contact-to-contact-list.md) |
| Remove one contact from a list | [Remove contact from the contact list](remove-contact-from-contact-list.md) |

### Custom Fields

| Goal | Endpoint |
|------|----------|
| Browse or filter custom fields | [Get custom fields page](get-custom-fields-page.md) |
| Create a custom field | [Create a custom field](create-custom-field.md) |
| Retrieve one custom field | [Get a single custom field](get-custom-field-by-id.md) |
| Change a custom field | [Update a custom field](update-custom-field.md) |
| Delete a custom field | [Delete a custom field](delete-custom-field-by-id.md) |

## Endpoints

### Contacts

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Get contacts page](get-contacts-page.md) | `GET` | `/api/v1/contacts/contacts` | Retrieves a paginated list of contacts. |
| [Create a contact](create-contact.md) | `POST` | `/api/v1/contacts/contacts` | Creates a new contact in the account. |
| [Get a single contact](get-contact-by-id.md) | `GET` | `/api/v1/contacts/contacts/{contactId}` | Retrieves details for a single contact by ID. |
| [Update a contact](update-contact.md) | `PATCH` | `/api/v1/contacts/contacts/{contactId}` | Updates an existing contact. |
| [Delete a contact](delete-contact-by-id.md) | `DELETE` | `/api/v1/contacts/contacts/{contactId}` | Deletes a contact from the account. |

### Lists

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Get contact lists page](get-contact-lists-page.md) | `GET` | `/api/v1/contacts/lists` | Retrieves a paginated list of contact lists. |
| [Create a contact list](create-contact-list.md) | `POST` | `/api/v1/contacts/lists` | Creates a new contact list. |
| [Get a single contact list](get-contact-list-by-id.md) | `GET` | `/api/v1/contacts/lists/{listId}` | Retrieves details for a single contact list by ID. |
| [Update a contact list](update-contact-list.md) | `PATCH` | `/api/v1/contacts/lists/{listId}` | Updates an existing contact list. |
| [Delete a contact list](delete-contact-list-by-id.md) | `DELETE` | `/api/v1/contacts/lists/{listId}` | Deletes a contact list. |
| [Add or remove multiple contacts to/from a list](modify-contacts-in-contact-list.md) | `PATCH` | `/api/v1/contacts/lists/{listId}/contacts` | Adds or removes multiple contacts to or from a contact list. |
| [Add contact to a list](add-contact-to-contact-list.md) | `POST` | `/api/v1/contacts/lists/{listId}/contacts/{contactId}` | Adds a contact to a contact list. |
| [Remove contact from the contact list](remove-contact-from-contact-list.md) | `DELETE` | `/api/v1/contacts/lists/{listId}/contacts/{contactId}` | Removes a contact from a contact list. |

### Custom Fields

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Get custom fields page](get-custom-fields-page.md) | `GET` | `/api/v1/contacts/custom-fields` | Retrieves a paginated list of custom fields. |
| [Create a custom field](create-custom-field.md) | `POST` | `/api/v1/contacts/custom-fields` | Creates a new custom field for contacts. |
| [Get a single custom field](get-custom-field-by-id.md) | `GET` | `/api/v1/contacts/custom-fields/{customFieldId}` | Retrieves details for a single custom field by ID. |
| [Update a custom field](update-custom-field.md) | `PATCH` | `/api/v1/contacts/custom-fields/{customFieldId}` | Updates an existing custom field. |
| [Delete a custom field](delete-custom-field-by-id.md) | `DELETE` | `/api/v1/contacts/custom-fields/{customFieldId}` | Deletes a custom field. |

[← All services](../index.md)
