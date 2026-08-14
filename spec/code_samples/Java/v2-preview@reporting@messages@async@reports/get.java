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
        String pageToken = "YOUR_PAGE_TOKEN";
        String reportName = "YOUR_REPORT_NAME";
        String status = "YOUR_STATUS";
        String startDate = "YOUR_START_DATE";
        String endDate = "YOUR_END_DATE";
        String sortDirection = "YOUR_SORT_DIRECTION";

        // HMAC authentication is also supported instead of Basic
        String auth = Base64.getEncoder().encodeToString((apiKey + ":" + apiSecret).getBytes(StandardCharsets.UTF_8));
        String url = apiHost + "/v2-preview/reporting/messages/async/reports" + "?" + "page_size=" + pageSize + "&" + "page_token=" + pageToken + "&" + "report_name=" + reportName + "&" + "status=" + status + "&" + "start_date=" + startDate + "&" + "end_date=" + endDate + "&" + "sort_direction=" + sortDirection;
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
