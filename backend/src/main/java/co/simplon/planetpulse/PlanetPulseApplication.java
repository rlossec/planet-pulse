package co.simplon.planetpulse;

import co.simplon.planetpulse.configs.RestCountriesProperties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication
@EnableConfigurationProperties(RestCountriesProperties.class)
public class PlanetPulseApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlanetPulseApplication.class, args);
    }

}
