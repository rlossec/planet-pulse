package co.simplon.planetpulse.dtos.integration.restcountries;

import jakarta.validation.constraints.NotBlank;

public record RestCountryFlag(@NotBlank String url_svg) {
}
