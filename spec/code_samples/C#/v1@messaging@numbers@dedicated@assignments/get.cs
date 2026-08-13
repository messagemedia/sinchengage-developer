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
        var pageSize = 0;
        var token = "YOUR_TOKEN";
        var numberId = "YOUR_NUMBER_ID";
        var matching = "YOUR_MATCHING";
        var country = "YOUR_COUNTRY";
        var type = "YOUR_TYPE";
        var types = "YOUR_TYPES";
        var classification = "YOUR_CLASSIFICATION";
        var serviceTypes = "YOUR_SERVICE_TYPES";
        var label = "YOUR_LABEL";
        var sortBy = "TIMESTAMP";
        var sortDirection = "ASCENDING";

        // HMAC authentication is also supported instead of Basic
        using var client = new HttpClient();
        var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{apiKey}:{apiSecret}"));
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var url = $"{apiHost}/v1/messaging/numbers/dedicated/assignments?page_size={pageSize}&token={token}&number_id={numberId}&matching={matching}&country={country}&type={type}&types={types}&classification={classification}&service_types={serviceTypes}&label={label}&sort_by={sortBy}&sort_direction={sortDirection}";
        using var response = await client.GetAsync(url);
        Console.WriteLine((int)response.StatusCode);
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}
