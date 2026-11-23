package co.simplon.planetpulse.dtos.constraints.validators;

import java.time.Year;

import co.simplon.planetpulse.dtos.constraints.IsYearNotInFuture;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public final class IsYearNotInFutureValidator
        implements ConstraintValidator<IsYearNotInFuture, Integer> {

    @Override
    public boolean isValid(final Integer value, final ConstraintValidatorContext context) {
        return value == null || value <= Year.now().getValue();
    }
}