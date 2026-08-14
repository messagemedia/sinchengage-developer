<?php
$apiKey = 'YOUR_API_KEY';
$apiSecret = 'YOUR_API_SECRET';
$apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs
$key = "YOUR_KEY";
$value = "YOUR_VALUE";
$url = "YOUR_URL";
$recipient = "YOUR_RECIPIENT";
$page = 0;
$pageSize = 0;

// HMAC authentication is also supported instead of Basic
$requestUrl = $apiHost . '/v1/reporting/links/summary?key=' . $key . '&value=' . $value . '&url=' . $url . '&recipient=' . $recipient . '&page=' . $page . '&pageSize=' . $pageSize;
$headers = [
    'Authorization: Basic ' . base64_encode($apiKey . ':' . $apiSecret),
    'Accept: application/json',
];

$ch = curl_init($requestUrl);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo $status, PHP_EOL;
echo $response, PHP_EOL;
