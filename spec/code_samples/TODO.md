# Code samples TODO

Tracks real request samples under `spec/code_samples/` for every OpenAPI operation × language.

**Policy (MAPI-2253):** empty placeholder files are not kept. Only nonempty samples with the correct extension are injected. Missing coverage is tracked here and fulfilled via follow-up work.

## Summary

| Metric | Count |
|--------|------:|
| Operations | 85 |
| Languages | 6 (C#, Java, JavaScript, PHP, Python, Ruby) |
| Full matrix | 510 |
| Present | 29 |
| **Missing** | **481** |
| Coverage | 5.7% |

## Required extensions

| Language | Extension |
|----------|-----------|
| `C#` | `.cs` |
| `Java` | `.java` |
| `JavaScript` | `.js` |
| `PHP` | `.php` |
| `Python` | `.py` |
| `Ruby` | `.rb` |

Path layout: `<lang>/<path-with-@>/<method><ext>` — see [README.md](./README.md).

## Coverage by tag

### Contacts

Missing **108** / 108 cells (18 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| GET | `/api/v1/contacts/contacts` | `getContactsPage` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/api/v1/contacts/contacts` | `createContact` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/api/v1/contacts/contacts/{contactId}` | `deleteContactById` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/api/v1/contacts/contacts/{contactId}` | `getContactById` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PATCH | `/api/v1/contacts/contacts/{contactId}` | `updateContact` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/api/v1/contacts/custom-fields` | `getCustomFieldsPage` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/api/v1/contacts/custom-fields` | `createCustomField` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/api/v1/contacts/custom-fields/{customFieldId}` | `deleteCustomFieldById` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/api/v1/contacts/custom-fields/{customFieldId}` | `getCustomFieldById` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PATCH | `/api/v1/contacts/custom-fields/{customFieldId}` | `updateCustomField` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/api/v1/contacts/lists` | `getContactListsPage` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/api/v1/contacts/lists` | `createContactList` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/api/v1/contacts/lists/{listId}` | `deleteContactListById` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/api/v1/contacts/lists/{listId}` | `getContactListById` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PATCH | `/api/v1/contacts/lists/{listId}` | `updateContactList` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PATCH | `/api/v1/contacts/lists/{listId}/contacts` | `modifyContactsInContactList` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/api/v1/contacts/lists/{listId}/contacts/{contactId}` | `removeContactFromContactList` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/api/v1/contacts/lists/{listId}/contacts/{contactId}` | `addContactToContactList` | — | C#, Java, JavaScript, PHP, Python, Ruby |

### Dedicated Numbers

Missing **42** / 42 cells (7 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| GET | `/v1/messaging/numbers/dedicated/` | `GetNumbers` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v1/messaging/numbers/dedicated/{id}` | `GetNumberById` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/v1/messaging/numbers/dedicated/{numberId}/assignment` | `DeleteAssignment` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v1/messaging/numbers/dedicated/{numberId}/assignment` | `GetAssignment` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PATCH | `/v1/messaging/numbers/dedicated/{numberId}/assignment` | `UpdateAssignment` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v1/messaging/numbers/dedicated/{numberId}/assignment` | `CreateAssignment` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v1/messaging/numbers/dedicated/assignments` | `GetAssignedNumbers` | — | C#, Java, JavaScript, PHP, Python, Ruby |

### Delivery Reports

Missing **4** / 12 cells (2 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| GET | `/v1/delivery_reports` | `CheckDeliveryReports` | Java, JavaScript, PHP, Python | C#, Ruby |
| POST | `/v1/delivery_reports/confirmed` | `ConfirmDeliveryReportsAsReceived` | Java, JavaScript, PHP, Python | C#, Ruby |

### Messages

Missing **3** / 18 cells (3 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| POST | `/v1/messages` | `SendMessages` | C#, Java, JavaScript, PHP, Python | Ruby |
| GET | `/v1/messages/{messageId}` | `GetMessageStatus` | C#, Java, JavaScript, PHP, Python | Ruby |
| PUT | `/v1/messages/{messageId}` | `CancelScheduledMessage` | C#, Java, JavaScript, PHP, Python | Ruby |

### Messaging Reports

Missing **96** / 96 cells (16 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| POST | `/v2-preview/reporting/detail/scheduled` | `detailscheduledreport` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PUT | `/v2-preview/reporting/detail/scheduled/{scheduled_id}` | `updatedetailscheduledreport` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v2-preview/reporting/messages/async/detail` | `PostAsyncDetailReport` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v2-preview/reporting/messages/async/detail/fields` | `GetAsyncDetailFields` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v2-preview/reporting/messages/async/reports` | `GetAsyncReportHistory` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v2-preview/reporting/messages/async/reports/{reportId}/download-url` | `GetAsyncReportDownloadUrl` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v2-preview/reporting/messages/async/status` | `GetAsyncDetailStatus` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v2-preview/reporting/messages/async/summary` | `PostAsyncSummaryReport` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v2-preview/reporting/messages/detail` | `PostDetailReport` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v2-preview/reporting/messages/insights` | `PostInsightReport` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v2-preview/reporting/messages/metakeys` | `PostMetadataKeys` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v2-preview/reporting/scheduled` | `GetActiveReport` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/v2-preview/reporting/scheduled/{scheduled_id}` | `DeleteScheduledReport` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v2-preview/reporting/scheduled/{scheduled_id}` | `GetScheduledReport` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v2-preview/reporting/summary/scheduled` | `summaryscheduledreport` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PUT | `/v2-preview/reporting/summary/scheduled/{scheduled_id}` | `updatesummaryscheduledreport` | — | C#, Java, JavaScript, PHP, Python, Ruby |

### Mobile Landing Pages (beta)

Missing **72** / 72 cells (12 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| POST | `/beta/smsplus/campaigns` | `CreateNewCampaign` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/beta/smsplus/campaigns/{id}` | `GetCampaign` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/beta/smsplus/campaigns/{id}/recipients` | `SendCampaignToRecipients` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/beta/smsplus/landing_pages` | `GetLandingPages` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/beta/smsplus/landing_pages` | `CreateaLandingPage` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/beta/smsplus/landing_pages/{id}` | `DeleteaLandingPage` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PATCH | `/beta/smsplus/landing_pages/{id}` | `UpdateaLandingPage` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/beta/smsplus/reporting/{campaign_id}/events` | `GetCampaignEvents` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/beta/smsplus/reporting/{campaign_id}/events/async` | `ExportCampaignEventsAsync` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/beta/smsplus/reporting/{campaign_id}/summary` | `GetCampaignSummary` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/beta/smsplus/templates` | `GetTemplates` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/beta/smsplus/templates/{id}/fields` | `GetTemplatesFieldsDefinition` | — | C#, Java, JavaScript, PHP, Python, Ruby |

### Number Authorisation

Missing **24** / 24 cells (4 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| GET | `/v1/number_authorisation/is_authorised/{numbers}` | `CheckIfOneOrSeveralNumbersAreCurrentlyBlacklisted` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v1/number_authorisation/mt/blacklist` | `ListAllBlockedNumbers` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v1/number_authorisation/mt/blacklist` | `AddOneOrMoreNumbersToYourBlacklist` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/v1/number_authorisation/mt/blacklist/{number}` | `RemoveANumberFromTheBlacklist` | — | C#, Java, JavaScript, PHP, Python, Ruby |

### Replies

Missing **6** / 12 cells (2 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| GET | `/v1/replies` | `CheckReplies` | Java, JavaScript, PHP | C#, Python, Ruby |
| POST | `/v1/replies/confirmed` | `ConfirmRepliesAsReceived` | Java, JavaScript, PHP | C#, Python, Ruby |

### Short Trackable Links Reports

Missing **12** / 12 cells (2 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| GET | `/v1/reporting/links/detail` | `LogDetail` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v1/reporting/links/summary` | `LogSummary` | — | C#, Java, JavaScript, PHP, Python, Ruby |

### Signature Key Management

Missing **42** / 42 cells (7 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| GET | `/v1/iam/signature_keys` | `GetSignatureKeyList` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v1/iam/signature_keys` | `CreateSignatureKey` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/v1/iam/signature_keys/{key_id}` | `DeleteSignatureKey` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v1/iam/signature_keys/{key_id}` | `GetSignatureKeyDetail` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/v1/iam/signature_keys/enabled` | `DisableTheCurrentEnabledSignatureKey` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v1/iam/signature_keys/enabled` | `GetEnabledSignatureKey` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PATCH | `/v1/iam/signature_keys/enabled` | `EnableSignatureKey` | — | C#, Java, JavaScript, PHP, Python, Ruby |

### Source Address

Missing **48** / 48 cells (8 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| GET | `/v1/messaging/numbers/sender_address/addresses/` | `GetAllApprovedSenderAddresses` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/v1/messaging/numbers/sender_address/addresses/{id}` | `deleteSenderAddressUsingDELETE` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v1/messaging/numbers/sender_address/addresses/{id}` | `GetSenderAddressById` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PATCH | `/v1/messaging/numbers/sender_address/addresses/{id}` | `updateSenderAddressUsingPATCH` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v1/messaging/numbers/sender_address/addresses/{id}/reverify` | `reVerifySenderAddressUsingPOST` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v1/messaging/numbers/sender_address/requests` | `requestSenderAddressUsingPOST` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| GET | `/v1/messaging/numbers/sender_address/requests/{id}` | `GetStatusOfSenderAddressRequest` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v1/messaging/numbers/sender_address/requests/{id}/verify` | `SubmittingVerificationCodePost` | — | C#, Java, JavaScript, PHP, Python, Ruby |

### Webhooks Management

Missing **24** / 24 cells (4 operations).

| Method | Path | operationId | Present | Missing |
|--------|------|-------------|---------|---------|
| GET | `/v1/webhooks/messages` | `RetrieveWebhook` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| POST | `/v1/webhooks/messages` | `CreateWebhook` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| DELETE | `/v1/webhooks/messages/{webhookId}` | `DeleteWebhook` | — | C#, Java, JavaScript, PHP, Python, Ruby |
| PATCH | `/v1/webhooks/messages/{webhookId}` | `UpdateWebhook` | — | C#, Java, JavaScript, PHP, Python, Ruby |

## How to fulfil a gap

1. Add a nonempty file at the path implied by method + API path + language extension.
2. Match the existing SDK-style samples where possible (see Messages samples).
3. Run `npm run inject` — it rejects empty files and wrong extensions.
4. Update this file (or regenerate it) so the matrix stays accurate.
