<?php
$apiKey = 'YOUR_API_KEY';
$apiSecret = 'YOUR_API_SECRET';
$apiHost = 'YOUR_API_HOST'; // Set YOUR_API_HOST to the regional host from the servers section in the docs

$body = [
  'label' => 'Weekly Report',
  'schedule' => [
    'timezone' => 'UTC',
    'cron_expression' => '0 0 * * * ? *',
    'type' => 'cron'
  ],
  'report' => [
    'period' => 'THIS_WEEK',
    'timezone' => 'Australia/Sydney',
    'direction' => 'all',
    'source' => '+61555555555',
    'destination' => '+61555555555',
    'metadata_key' => 'broadcastId',
    'metadata_value' => 'ABC',
    'accounts' => [
      'Account1',
      'Account2'
    ],
    'status' => [
      'DELIVERED',
      'ENROUTE'
    ],
    'opt_out' => 'true',
    'group_by' => [
      'DAY',
      'WEEK'
    ],
    'delivery_options' => [
      [
        'delivery_type' => 'EMAIL',
        'delivery_addresses' => [
          'email@example.com',
          'test@example.com'
        ],
        'delivery_format' => 'CSV'
      ]
    ]
  ],
  'metadata' => [
    [
      'key' => 'myKey',
      'value' => 'myValue'
    ],
    [
      'key' => 'anotherKey',
      'value' => 'anotherValue'
    ]
  ]
];

// HMAC authentication is also supported instead of Basic
$url = $apiHost . '/v2-preview/reporting/summary/scheduled';
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
