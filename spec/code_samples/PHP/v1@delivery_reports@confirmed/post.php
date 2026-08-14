<?php
$apiKey = 'YOUR_API_KEY';
$apiSecret = 'YOUR_API_SECRET';
$apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

$body = [
  'delivery_report_ids' => [
    '011dcead-6988-4ad6-a1c7-6b6c68ea628d',
    '3487b3fa-6586-4979-a233-2d1b095c7718',
    'ba28e94b-c83d-4759-98e7-ff9c7edb87a1'
  ]
];

// HMAC authentication is also supported instead of Basic
$url = $apiHost . '/v1/delivery_reports/confirmed';
$headers = [
    'Authorization: Basic ' . base64_encode($apiKey . ':' . $apiSecret),
    'Accept: application/json',
    'Content-Type: application/json',
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo $status, PHP_EOL;
echo $response, PHP_EOL;
