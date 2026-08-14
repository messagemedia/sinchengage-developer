import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class Sample {
    public static void main(String[] args) throws Exception {
        String apiKey = "YOUR_API_KEY";
        String apiSecret = "YOUR_API_SECRET";
        String apiHost = "YOUR_API_HOST"; // Set YOUR_API_HOST to the regional host from the servers section in the docs

        String body = """
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
              "DELIVERED",
              "ENROUTE"
            ],
            "opt_out": "true",
            "group_by": [
              "DAY",
              "WEEK"
            ],
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
        String auth = Base64.getEncoder().encodeToString((apiKey + ":" + apiSecret).getBytes(StandardCharsets.UTF_8));
        String url = apiHost + "/v2-preview/reporting/summary/scheduled";
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest.Builder builder = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Basic " + auth)
            .header("Accept", "application/json");
        builder.header("Content-Type", "application/json");
        builder.method("POST", HttpRequest.BodyPublishers.ofString(body));
        HttpResponse<String> response = client.send(builder.build(), HttpResponse.BodyHandlers.ofString());
        System.out.println(response.statusCode());
        System.out.println(response.body());
    }
}
