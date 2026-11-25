package co.simplon.planetpulse.dtos.integration.restcountries;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RestCountry(
        @NotNull @Valid RestCountryNames names,
        @NotNull @Valid RestCountryCodes codes,
        @NotNull @Valid RestCountryFlag flag,
        @NotBlank String region,
        @NotBlank String subregion,
        @NotNull @Valid RestCountryArea area,
        @NotNull Long population,
        RestCountryMeta _meta
) {
}
