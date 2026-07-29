# Spec layout

This directory holds the multi-file OpenAPI description for Sinch Engage.

Edit path and component files under `paths/` and `components/`. The entry document is [`openapi.yaml`](openapi.yaml).

For the full layout, edit rules, and build pipeline (`bundle` → inject code samples → ReDoc), see the [root README](../README.md).

## Path filename conventions

Path files live under `paths/<tag>/` and are named after the URL path with `/` replaced by `_`.

A trailing underscore in a path filename maps to a **trailing slash** in the OpenAPI path key. That is intentional for the current API surface (and still triggers Redocly `no-path-trailing-slash` warnings, kept at `warn` until the URLs change as a contract decision):

| Path file | OpenAPI path |
|-----------|--------------|
| `paths/source-address/v1_messaging_numbers_sender_address_addresses_.yaml` | `/v1/messaging/numbers/sender_address/addresses/` |
| `paths/dedicated-numbers/v1_messaging_numbers_dedicated_.yaml` | `/v1/messaging/numbers/dedicated/` |

Do not rename these files to drop the trailing `_` without also changing the path keys (and confirming the live API).
