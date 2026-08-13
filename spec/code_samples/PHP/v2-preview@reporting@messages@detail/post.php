<?php
$apiKey = 'YOUR_API_KEY';
$apiSecret = 'YOUR_API_SECRET';
$apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

$body = [
  'start_date' => '2022-12-12T00:00:00.000z',
  'end_date' => '2022-12-14T00:00:00.000z',
  'direction' => 'all',
  'timezone' => 'Australia/Sydney',
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
    'Account1',
    'Account2'
  ],
  'status' => [
    'DELIVERED'
  ],
  'opt_out' => 'true',
  'mms_media' => 'true',
  'message_format' => [
    'MMS',
    'TTS'
  ],
  'channels' => [
    'SMS',
    'WHATSAPP'
  ],
  'page' => 0,
  'page_size' => 20
];

// HMAC authentication is also supported instead of Basic
$url = $apiHost . '/v2-preview/reporting/messages/detail';
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
