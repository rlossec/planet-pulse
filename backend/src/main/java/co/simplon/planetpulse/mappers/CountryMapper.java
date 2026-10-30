package co.simplon.planetpulse.mappers;


import co.simplon.planetpulse.dtos.integration.restcountries.RestCountry;
import co.simplon.planetpulse.entities.Country;

public class CountryMapper {

    public Country toEntity(RestCountry inputs) {
        Country country = new Country();
        country.setName(inputs.names().common());
        country.setIsoCode(inputs.codes().alpha_2());
        country.setFlag(inputs.flag().url_svg());

        country.setPopulation(inputs.population());

//        country.setRegion(inputs.region());
//        country.setSubregion(inputs.subregion());

        return country;
    }
}
