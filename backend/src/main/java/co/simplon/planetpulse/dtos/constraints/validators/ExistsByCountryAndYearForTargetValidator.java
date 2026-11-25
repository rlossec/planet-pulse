package co.simplon.planetpulse.dtos.constraints.validators;

import co.simplon.planetpulse.dtos.AnnualTargetCreateDto;
import co.simplon.planetpulse.dtos.constraints.ExistsByCountryAndYearForTarget;
import co.simplon.planetpulse.repositories.AnnualTargetRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public final class ExistsByCountryAndYearForTargetValidator
        implements ConstraintValidator<ExistsByCountryAndYearForTarget, AnnualTargetCreateDto> {

    private final AnnualTargetRepository repository;

    public ExistsByCountryAndYearForTargetValidator(AnnualTargetRepository repository) {
        this.repository = repository;
    }

    @Override
    public boolean isValid(AnnualTargetCreateDto value, ConstraintValidatorContext context) {
        if (value.isoCode2() == null || value.year() == null) {
            return true;
        }

        return !repository.existsByCountry_IsoCode2AndYear(
                value.isoCode2(), value.year().shortValue());
    }
}
