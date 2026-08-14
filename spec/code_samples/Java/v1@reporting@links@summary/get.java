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
        String key = "YOUR_KEY";
        String value = "YOUR_VALUE";
        String url = "YOUR_URL";
        String recipient = "YOUR_RECIPIENT";
        double page = 0d;
        double pageSize = 0d;

        // HMAC authentication is also supported instead of Basic
        String auth = Base64.getEncoder().encodeToString((apiKey + ":" + apiSecret).getBytes(StandardCharsets.UTF_8));
        String requestUrl = apiHost + "/v1/reporting/links/summary" + "?" + "key=" + key + "&" + "value=" + value + "&" + "url=" + url + "&" + "recipient=" + recipient + "&" + "page=" + page + "&" + "pageSize=" + pageSize;
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest.Builder builder = HttpRequest.newBuilder()
            .uri(URI.create(requestUrl))
            .header("Authorization", "Basic " + auth)
            .header("Accept", "application/json");
        builder.method("GET", HttpRequest.BodyPublishers.noBody());
        HttpResponse<String> response = client.send(builder.build(), HttpResponse.BodyHandlers.ofString());
        System.out.println(response.statusCode());
        System.out.println(response.body());
    }
}
