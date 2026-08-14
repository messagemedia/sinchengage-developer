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
          "name": "My group",
          "alias": "Group1"
        }
        """;

        // HMAC authentication is also supported instead of Basic
        using var client = new HttpClient();
        var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{apiKey}:{apiSecret}"));
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var url = $"{apiHost}/api/v1/contacts/lists";
        using var content = new StringContent(body, Encoding.UTF8, "application/json");
        using var response = await client.PostAsync(url, content);
        Console.WriteLine((int)response.StatusCode);
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}
