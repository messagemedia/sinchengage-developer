const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';
const apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
const pageSize = 0;
const pageToken = 'YOUR_PAGE_TOKEN';
const reportName = 'YOUR_REPORT_NAME';
const status = 'YOUR_STATUS';
const startDate = 'YOUR_START_DATE';
const endDate = 'YOUR_END_DATE';
const sortDirection = 'YOUR_SORT_DIRECTION';

// HMAC authentication is also supported instead of Basic
const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const response = await fetch(`${apiHost}/v2-preview/reporting/messages/async/reports?page_size=${pageSize}&page_token=${pageToken}&report_name=${reportName}&status=${status}&start_date=${startDate}&end_date=${endDate}&sort_direction=${sortDirection}`, {
  method: 'GET',
  headers: {
    Authorization: `Basic ${auth}`,
    Accept: 'application/json',
  },
});

console.log(response.status);
console.log(await response.text());
