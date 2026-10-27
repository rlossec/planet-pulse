package co.simplon.planetpulse.dtos;

import java.math.BigDecimal;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;

public record AnnualIndicatorUpdateDto(
        @Min(value = 0, message = "Minimum CO2 annual emissions is 0.")
        Integer co2,

        @DecimalMin(value = "0", message = "Renewable energy must be between 0 and 100.")
        @DecimalMax(value = "100", message = "Renewable energy must be between 0 and 100.")
        @Digits(integer = 3, fraction = 1, message = "Renewable energy must have at most 1 decimal.")
        BigDecimal renewableEnergy,

        @DecimalMin(value = "0", message = "Forest area value must be between 0 and 100.")
        @DecimalMax(value = "100", message = "Forest area must be between 0 and 100.")
        @Digits(integer = 3, fraction = 2, message = "Forest area must have at most 2 decimals.")
        BigDecimal forest,

        @Min(value = 0, message = "Minimum PM2.5 emissions is 0.")
        Integer pm25) {

    @AssertTrue(message = "At least one indicator value must be provided.")
    public boolean isAtLeastOneIndicatorProvided() {
        return co2 != null || renewableEnergy != null || forest != null || pm25 != null;
    }
}
