package co.simplon.planetpulse.mappers;

import java.math.BigDecimal;

import org.springframework.stereotype.Component;

import co.simplon.planetpulse.dtos.integration.restcountries.RestCountry;
import co.simplon.planetpulse.entities.Country;
import co.simplon.planetpulse.entities.Subregion;

@Component
public class CountryMapper {

    public Country toEntity(RestCountry inputs, Subregion subregion) {
        Country country = new Country();
        country.setName(inputs.names().common());
        country.setIsoCode2(inputs.codes().alpha_2());
        country.setFlag(inputs.flag().url_svg());
        country.setArea(BigDecimal.valueOf(inputs.area().kilometers()));
        country.setPopulation(inputs.population());
        country.setSubregion(subregion);
        return country;
    }
}
