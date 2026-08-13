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
          "start_date": "2022-12-12T01:01:01.001z",
          "end_date": "2022-12-14T01:01:01.001z",
          "timezone": "Australia/Sydney",
          "direction": "all",
          "source": "+61555555555",
          "sources": [
            "+61555555555",
            "+614987654321"
          ],
          "destination": "+61555555555",
          "destinations": [
            "+61555555555",
            "+614987654321"
          ],
          "metadata_key": "broadcastId",
          "metadata_value": "ABC",
          "metadata_values": [
            "meta1",
            "meta2"
          ],
          "accounts": [
            "account1",
            "account2"
          ],
          "status": [
            "DELIVERED",
            "ENROUTE"
          ],
          "opt_out": "true",
          "channels": [
            "SMS",
            "WHATSAPP"
          ],
          "group_by": [
            "WEEK",
            "ACCOUNT"
          ]
        }
        """;

        // HMAC authentication is also supported instead of Basic
        using var client = new HttpClient();
        var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{apiKey}:{apiSecret}"));
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var url = $"{apiHost}/v2-preview/reporting/messages/insights";
        using var content = new StringContent(body, Encoding.UTF8, "application/json");
        using var response = await client.PostAsync(url, content);
        Console.WriteLine((int)response.StatusCode);
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}
