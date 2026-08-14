<?php
$apiKey = 'YOUR_API_KEY';
$apiSecret = 'YOUR_API_SECRET';
$apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

$body = [
  'start_date' => '2022-12-12T01:01:01.001z',
  'end_date' => '2022-12-14T01:01:01.001z',
  'timezone' => 'Australia/Sydney',
  'direction' => 'all',
  'source' => '+61555555555',
  'sources' => [
    '+61555555555',
    '+614987654321'
  ],
  'destination' => '+61555555555',
  'destinations' => [
    '+61555555555',
    '+614987654321'
  ],
  'metadata_key' => 'broadcastId',
  'metadata_value' => 'ABC',
  'metadata_values' => [
    'meta1',
    'meta2'
  ],
  'accounts' => [
    'account1',
    'account2'
  ],
  'status' => [
    'DELIVERED',
    'ENROUTE'
  ],
  'opt_out' => 'true',
  'channels' => [
    'SMS',
    'WHATSAPP'
  ],
  'group_by' => [
    'WEEK',
    'ACCOUNT'
  ]
];

// HMAC authentication is also supported instead of Basic
$url = $apiHost . '/v2-preview/reporting/messages/insights';
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
