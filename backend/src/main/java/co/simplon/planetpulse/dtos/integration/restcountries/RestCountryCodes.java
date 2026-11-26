package co.simplon.planetpulse.dtos.integration.restcountries;

import jakarta.validation.constraints.NotBlank;

public record RestCountryCodes(@NotBlank String alpha_2) {
}
