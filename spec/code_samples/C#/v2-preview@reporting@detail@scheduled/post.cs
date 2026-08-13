using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var apiKey = "YOUR_API_KEY";
        var apiSecret = "YOUR_API_SECRET";
        var apiHost = "YOUR_API_HOST"; // Set YOUR_API_HOST to the regional host from the servers section in the docs

        var body = """
        {
          "label": "Weekly Report",
          "schedule": {
            "timezone": "UTC",
            "cron_expression": "0 0 * * * ? *",
            "type": "cron"
          },
          "report": {
            "period": "THIS_WEEK",
            "timezone": "Australia/Sydney",
            "direction": "all",
            "source": "+61555555555",
            "destination": "+61555555555",
            "metadata_key": "broadcastId",
            "metadata_value": "ABC",
            "accounts": [
              "Account1",
              "Account2"
            ],
            "status": [
              "DELIVERED"
            ],
            "opt_out": "true",
            "delivery_options": [
              {
                "delivery_type": "EMAIL",
                "delivery_addresses": [
                  "email@example.com",
                  "test@example.com"
                ],
                "delivery_format": "CSV"
              }
            ]
          },
          "metadata": [
            {
              "key": "myKey",
              "value": "myValue"
            },
            {
              "key": "anotherKey",
              "value": "anotherValue"
            }
          ]
        }
        """;

        // HMAC authentication is also supported instead of Basic
        using var client = new HttpClient();
        var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{apiKey}:{apiSecret}"));
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var url = $"{apiHost}/v2-preview/reporting/detail/scheduled";
        using var content = new StringContent(body, Encoding.UTF8, "application/json");
        using var response = await client.PostAsync(url, content);
        Console.WriteLine((int)response.StatusCode);
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}
