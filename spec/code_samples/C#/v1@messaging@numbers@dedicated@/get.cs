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
        var country = "YOUR_COUNTRY";
        var matching = "YOUR_MATCHING";
        var pageSize = 0;
        var serviceTypes = "YOUR_SERVICE_TYPES";
        var types = "YOUR_TYPES";
        var token = "YOUR_TOKEN";

        // HMAC authentication is also supported instead of Basic
        using var client = new HttpClient();
        var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{apiKey}:{apiSecret}"));
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var url = $"{apiHost}/v1/messaging/numbers/dedicated/?country={country}&matching={matching}&page_size={pageSize}&service_types={serviceTypes}&types={types}&token={token}";
        using var response = await client.GetAsync(url);
        Console.WriteLine((int)response.StatusCode);
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}
