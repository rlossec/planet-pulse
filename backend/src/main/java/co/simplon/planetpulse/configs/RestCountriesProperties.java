package co.simplon.planetpulse.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "rest-countries.api")
public class RestCountriesProperties {

    private String baseUrl;
    private String version;
    private String key;

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getUrl() {
        String normalizedBaseUrl = baseUrl.replaceAll("/+$", "");
        String normalizedVersion = version
                .replaceAll("^/+", "")
                .replaceAll("/+$", "");

        return normalizedBaseUrl + "/v" + normalizedVersion;
    }
}