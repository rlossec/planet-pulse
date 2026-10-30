package co.simplon.planetpulse.dtos.integration.restcountries;



public record RestCountry(
        RestCountryNames names,
        RestCountryCodes codes,
        RestCountryFlag flag,
        String region,
        String subregion,
        RestCountryArea area,
        Long population,
        RestCountryMeta _meta
) {
}

