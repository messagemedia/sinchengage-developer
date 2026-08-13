<?php
$apiKey = 'YOUR_API_KEY';
$apiSecret = 'YOUR_API_SECRET';
$apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
$pageSize = 0;
$pageToken = "YOUR_PAGE_TOKEN";
$reportName = "YOUR_REPORT_NAME";
$status = "YOUR_STATUS";
$startDate = "YOUR_START_DATE";
$endDate = "YOUR_END_DATE";
$sortDirection = "YOUR_SORT_DIRECTION";

// HMAC authentication is also supported instead of Basic
$url = $apiHost . '/v2-preview/reporting/messages/async/reports?page_size=' . $pageSize . '&page_token=' . $pageToken . '&report_name=' . $reportName . '&status=' . $status . '&start_date=' . $startDate . '&end_date=' . $endDate . '&sort_direction=' . $sortDirection;
$headers = [
    'Authorization: Basic ' . base64_encode($apiKey . ':' . $apiSecret),
    'Accept: application/json',
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo $status, PHP_EOL;
echo $response, PHP_EOL;
