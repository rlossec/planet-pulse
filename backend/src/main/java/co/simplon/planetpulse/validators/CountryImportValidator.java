package co.simplon.planetpulse.validators;

import org.springframework.stereotype.Component;

import co.simplon.planetpulse.dtos.integration.restcountries.RestCountry;
import jakarta.validation.Validator;

@Component
public class CountryImportValidator {

    private final Validator validator;

    public CountryImportValidator(Validator validator) {
        this.validator = validator;
    }

    public boolean isValid(RestCountry country) {
        return validator.validate(country).isEmpty();
    }
}
