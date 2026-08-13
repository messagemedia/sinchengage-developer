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
        String auth = Base64.getEncoder().encodeToString((apiKey + ":" + apiSecret).getBytes(StandardCharsets.UTF_8));
        String url = apiHost + "/v1/messages";
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
