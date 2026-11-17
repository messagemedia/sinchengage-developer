# MAPI-2592: Clarify channel selection edge cases

| Field | Value |
|-------|-------|
| **Date** | 2026-11-16 |
| **Branch** | fix-MAPI-2592-channel-selection |
| **Author** | Chris Sos |
| **Type** | docs |
| **Breaking** | no |

## What Changed

- Table row T1 (`format` omitted, `rich_content` and `content` present) now explains that `content` is the text under `suggestions`, and that `content` is dropped when `rich_content` is used.
- Added a note on `content` with `rich_content` (T1): `content` is not sent, not returned on the `202` response or by Get message status, and not used as an SMS fallback. Points to `fallback_message`, and notes that explicit `format: "RCS"` rejects sending both `content` and `rich_content` with `400`.
- Request-time errors are now `400` for T4–T6 and T8, plus `402 Payment Required` when the message is sent as RCS (explicit or inferred) and the account isn't enabled for RCS. "RCS not enabled on the account" was removed from the delivery-report failures.
- `fallback_message` note: with explicit `format: "SMS"`, `fallback_message` is rejected with `400`.
- Matching updates to the `RcsRichContent` and `RcsFallbackMessage` schema descriptions and the `llms-curation.yaml` Channel selection note.

## Why

The T1 behaviour for `content`, the `402` for RCS-not-enabled accounts, and the `fallback_message` rejection on explicit SMS were not described, so developers had to find out from responses.

## Affected Components

- `docs/api/messages`
- `spec/components/schemas`
- `spec/paths/messages`
- `docs` (llms-curation)

## Files Changed

### Source
- `docs/api/messages/send-messages.md`
- `spec/paths/messages/v1_messages.yaml`
- `spec/components/schemas/RcsRichContent.yaml`
- `spec/components/schemas/RcsFallbackMessage.yaml`

### Config / Dependencies
- `docs/llms-curation.yaml`
