# Messaging Reports

Run synchronous, asynchronous, and scheduled reports for messages sent and received through a Sinch account.

## Base URLs

| Environment | URL |
|-------------|-----|
| EU instance | `https://eu.app.api.sinch.com` |
| APAC instance | `https://au.app.api.sinch.com` |

## Choose an endpoint

| Goal | Section |
|------|---------|
| Immediate detail / insight / metadata-key reports | [Synchronous detail and summary reports](#synchronous-detail-and-summary-reports) |
| Long-running async reports, status, history, download | [Asynchronous reports](#asynchronous-reports) |
| Recurring scheduled detail/summary reports | [Scheduled reports](#scheduled-reports) |

## Endpoints

### Synchronous detail and summary reports

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Post detail report](post-detail-report.md) | `POST` | `/v2-preview/reporting/messages/detail` | Generates a report listing all sent and/or received messages within a specified time period. |
| [Post insight report](post-insight-report.md) | `POST` | `/v2-preview/reporting/messages/insights` | Create report summary containing total number of sent, received and billing units, using pre-calculated data to improve performance. |
| [Metadata Keys](post-metadata-keys.md) | `POST` | `/v2-preview/reporting/messages/metakeys` | Returns a list of metadata keys. |

### Asynchronous reports

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Post async detail report](post-async-detail-report.md) | `POST` | `/v2-preview/reporting/messages/async/detail` | Generates an asynchronous report listing all sent and/or received messages within a specified time period. |
| [Post async summary report](post-async-summary-report.md) | `POST` | `/v2-preview/reporting/messages/async/summary` | Creates an asynchronous report summary containing total number of sent, received and billing units. |
| [Get async detail fields](get-async-detail-fields.md) | `POST` | `/v2-preview/reporting/messages/async/detail/fields` | Can be used for async detail report to select the fields to export csv files |
| [Get async detail report status](get-async-detail-status.md) | `GET` | `/v2-preview/reporting/messages/async/status` | Retrieves the status of a detail report. |
| [Get async report history](get-async-report-history.md) | `GET` | `/v2-preview/reporting/messages/async/reports` | Returns a list of asynchronous reports that have been requested by the current account. |
| [Get async report download URL](get-async-report-download-url.md) | `GET` | `/v2-preview/reporting/messages/async/reports/{reportId}/download-url` | Returns a temporary pre-signed URL for downloading the generated report. The URL allows customers to securely download the report file directly using the provided reportId. |

### Scheduled reports

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| [Scheduled detail report](detailscheduledreport.md) | `POST` | `/v2-preview/reporting/detail/scheduled` | Create scheduled report in detail containing total number of sent, received and billing units. |
| [Scheduled summary report](summaryscheduledreport.md) | `POST` | `/v2-preview/reporting/summary/scheduled` | Create scheduled report summary containing total number of sent, received and billing units. |
| [Update a scheduled detail report](updatedetailscheduledreport.md) | `PUT` | `/v2-preview/reporting/detail/scheduled/{id}` | Updates a selected scheduled report in detail, which contains a total number of sent, received and billing units. |
| [Update a scheduled summary report](updatesummaryscheduledreport.md) | `PUT` | `/v2-preview/reporting/summary/scheduled/{id}` | Updates a selected scheduled report summary, which contains a total number of sent, received and billing units. |
| [Get active reports](get-active-report.md) | `GET` | `/v2-preview/reporting/scheduled` | Retrieves all ACTIVE scheduled reports of a provided account. |
| [Get scheduled report by id](get-scheduled-report.md) | `GET` | `/v2-preview/reporting/scheduled/{id}` | Retrieves a scheduled report by providing its id. |
| [Delete scheduled report by id](delete-scheduled-report.md) | `DELETE` | `/v2-preview/reporting/scheduled/{id}` | Deletes a scheduled report by providing its id. |

## Specification details

The Sinch Reports API provides a number of endpoints for running reports of messages sent and received through<br>a Sinch Account. The API allows two kinds of reports, _Detailed Reports_ and _Summary Reports_.<br>Detailed reports list all messages and the details of each message sent or received in a specified time period. Summary reports allow inbound and outbound message data to be aggregated on a number of dimensions.

[← All services](../index.md)
