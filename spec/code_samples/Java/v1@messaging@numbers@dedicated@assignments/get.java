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
        int pageSize = 0;
        String token = "YOUR_TOKEN";
        String numberId = "YOUR_NUMBER_ID";
        String matching = "YOUR_MATCHING";
        String country = "YOUR_COUNTRY";
        String type = "YOUR_TYPE";
        String types = "YOUR_TYPES";
        String classification = "YOUR_CLASSIFICATION";
        String serviceTypes = "YOUR_SERVICE_TYPES";
        String label = "YOUR_LABEL";
        String sortBy = "TIMESTAMP";
        String sortDirection = "ASCENDING";

        // HMAC authentication is also supported instead of Basic
        String auth = Base64.getEncoder().encodeToString((apiKey + ":" + apiSecret).getBytes(StandardCharsets.UTF_8));
        String url = apiHost + "/v1/messaging/numbers/dedicated/assignments" + "?" + "page_size=" + pageSize + "&" + "token=" + token + "&" + "number_id=" + numberId + "&" + "matching=" + matching + "&" + "country=" + country + "&" + "type=" + type + "&" + "types=" + types + "&" + "classification=" + classification + "&" + "service_types=" + serviceTypes + "&" + "label=" + label + "&" + "sort_by=" + sortBy + "&" + "sort_direction=" + sortDirection;
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest.Builder builder = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("Authorization", "Basic " + auth)
            .header("Accept", "application/json");
        builder.method("GET", HttpRequest.BodyPublishers.noBody());
        HttpResponse<String> response = client.send(builder.build(), HttpResponse.BodyHandlers.ofString());
        System.out.println(response.statusCode());
        System.out.println(response.body());
    }
}
