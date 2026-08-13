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
          "reply_ids": [
            "011dcead-6988-4ad6-a1c7-6b6c68ea628d",
            "3487b3fa-6586-4979-a233-2d1b095c7718",
            "ba28e94b-c83d-4759-98e7-ff9c7edb87a1"
          ]
        }
        """;

        // HMAC authentication is also supported instead of Basic
        String auth = Base64.getEncoder().encodeToString((apiKey + ":" + apiSecret).getBytes(StandardCharsets.UTF_8));
        String url = apiHost + "/v1/replies/confirmed";
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
