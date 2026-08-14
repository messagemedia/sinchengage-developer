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
          "firstName": "Adam",
          "lastName": "Smith",
          "alias": "user1234",
          "dateOfBirth": "2022-08-18",
          "country": "US",
          "state": "CA",
          "location": "Sunset Blvd",
          "note": "Note",
          "channels": [
            {
              "channelId": "+15553456783",
              "type": "SMS",
              "subscriptionState": "UNSUBSCRIBED"
            }
          ],
          "lists": [
            {
              "id": "025e93d3-051b-43f9-b12e-4b5842228dee"
            }
          ],
          "customFields": [
            {
              "id": "025e93d3-051b-43f9-b12e-4b5842228dee",
              "value": "John"
            }
          ]
        }
        """;

        // HMAC authentication is also supported instead of Basic
        using var client = new HttpClient();
        var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{apiKey}:{apiSecret}"));
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var url = $"{apiHost}/api/v1/contacts/contacts";
        using var content = new StringContent(body, Encoding.UTF8, "application/json");
        using var response = await client.PostAsync(url, content);
        Console.WriteLine((int)response.StatusCode);
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}
