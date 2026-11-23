package co.simplon.planetpulse.dtos.constraints.validators;

import java.math.BigDecimal;

import co.simplon.planetpulse.dtos.AnnualIndicatorCreateDto;
import co.simplon.planetpulse.dtos.AnnualIndicatorUpdateDto;
import co.simplon.planetpulse.dtos.constraints.AtLeastOneIndicatorProvided;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public final class AtLeastOneIndicatorProvidedValidator
        implements ConstraintValidator<AtLeastOneIndicatorProvided, Object> {

    @Override
    public boolean isValid(
            Object value,
            ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        if (value instanceof AnnualIndicatorCreateDto dto) {
            return hasIndicator(dto.co2(), dto.renewableEnergy(), dto.forest(), dto.pm25());
        }

        if (value instanceof AnnualIndicatorUpdateDto dto) {
            return hasIndicator(dto.co2(), dto.renewableEnergy(), dto.forest(), dto.pm25());
        }

        return false;
    }

    private boolean hasIndicator(
            Integer co2,
            BigDecimal renewableEnergy,
            BigDecimal forest,
            Integer pm25) {
        return co2 != null || renewableEnergy != null || forest != null || pm25 != null;
    }
}