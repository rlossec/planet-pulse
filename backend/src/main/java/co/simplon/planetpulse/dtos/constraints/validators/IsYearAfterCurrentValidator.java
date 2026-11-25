package co.simplon.planetpulse.dtos.constraints.validators;

import java.time.Year;

import co.simplon.planetpulse.dtos.constraints.IsYearAfterCurrent;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public final class IsYearAfterCurrentValidator
        implements ConstraintValidator<IsYearAfterCurrent, Integer> {

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        return value == null || value > Year.now().getValue();
    }
}
