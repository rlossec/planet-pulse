package co.simplon.planetpulse.services;

import co.simplon.planetpulse.configs.RestCountriesProperties;
import co.simplon.planetpulse.dtos.integration.restcountries.RestCountriesResponse;
import co.simplon.planetpulse.dtos.integration.restcountries.RestCountry;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;

import java.util.List;


@Service
public class RestCountriesService {

    private final RestClient restClient;
    private final String apiKey;

    public RestCountriesService(
            RestCountriesProperties properties) {

        this.restClient = RestClient.builder()
                .baseUrl(properties.getUrl())
                .build();
        this.apiKey = properties.getKey();
    }



    public List<RestCountry> getAllCountries() {
        if (!StringUtils.hasText(apiKey)) {
            throw new IllegalStateException(
                    "REST_COUNTRIES_API_KEY is missing. Set it in the repository-root .env file.");
        }

        RestCountriesResponse response = restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("response_fields",
                                "codes.alpha_2,names.common,flag.url_svg,region,subregion,area.kilometers,population")
                        .queryParam("limit", 100)
                        .build())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey.trim())
                .retrieve()
                .body(RestCountriesResponse.class);

        return response.data().objects();
    }

}
