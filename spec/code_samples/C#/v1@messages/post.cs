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
          "messages": [
            {
              "callback_url": "https://my.callback.url.com",
              "content": "My first message",
              "destination_number": "+61491570156",
              "delivery_report": true,
              "format": "SMS",
              "message_expiry_timestamp": "2016-11-03T11:49:02.807Z",
              "metadata": {
                "key1": "value1",
                "key2": "value2"
              },
              "scheduled": "2016-11-03T11:49:02.807Z",
              "source_number": "+61491570157",
              "source_number_type": "INTERNATIONAL"
            },
            {
              "callback_url": "https://my.callback.url.com",
              "content": "My second message",
              "destination_number": "+61491570158",
              "delivery_report": true,
              "format": "MMS",
              "subject": "This is an MMS message",
              "media": [
                "https://images.pexels.com/photos/1018350/pexels-photo-1018350.jpeg?cs=srgb&dl=architecture-buildings-city-1018350.jpg"
              ],
              "message_expiry_timestamp": "2016-11-03T11:49:02.807Z",
              "metadata": {
                "key1": "value1",
                "key2": "value2"
              },
              "scheduled": "2016-11-03T11:49:02.807Z",
              "source_number": "+61491570159",
              "source_number_type": "INTERNATIONAL"
            }
          ]
        }
        """;

        // HMAC authentication is also supported instead of Basic
        using var client = new HttpClient();
        var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{apiKey}:{apiSecret}"));
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var url = $"{apiHost}/v1/messages";
        using var content = new StringContent(body, Encoding.UTF8, "application/json");
        using var response = await client.PostAsync(url, content);
        Console.WriteLine((int)response.StatusCode);
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}
