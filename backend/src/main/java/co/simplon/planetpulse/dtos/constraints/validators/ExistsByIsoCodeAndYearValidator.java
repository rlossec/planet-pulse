package co.simplon.planetpulse.dtos.constraints.validators;

import co.simplon.planetpulse.dtos.AnnualIndicatorCreateDto;
import co.simplon.planetpulse.dtos.constraints.ExistsByIsoCodeAndYear;
import co.simplon.planetpulse.repositories.AnnualIndicatorRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public final class ExistsByIsoCodeAndYearValidator
        implements ConstraintValidator<ExistsByIsoCodeAndYear, AnnualIndicatorCreateDto> {

    private final AnnualIndicatorRepository repository;

    public ExistsByIsoCodeAndYearValidator(AnnualIndicatorRepository repository) {
        this.repository = repository;
    }

    @Override
    public boolean isValid(
            AnnualIndicatorCreateDto value,
            ConstraintValidatorContext context) {
        if (value == null || value.isoCode2() == null || value.year() == null) {
            return true;
        }

        return !repository.existsByCountry_IsoCode2AndYear(
                value.isoCode2(), value.year().shortValue());
    }
}