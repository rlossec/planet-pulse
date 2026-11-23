package co.simplon.planetpulse.dtos;

import java.math.BigDecimal;

import co.simplon.planetpulse.dtos.constraints.AtLeastOneIndicatorProvided;
import co.simplon.planetpulse.dtos.constraints.ExistsByCountryAndYearForTarget;
import co.simplon.planetpulse.dtos.constraints.IsYearAfterCurrent;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@AtLeastOneIndicatorProvided(message = "TARGET_REQUIRED")
@ExistsByCountryAndYearForTarget
public record AnnualTargetCreateDto(
        @NotBlank(message = "COUNTRY_CODE_REQUIRED")
        @Pattern(regexp = "[A-Z]{2}", message = "COUNTRY_CODE_FORMAT")
        String isoCode2,

        @NotNull(message = "YEAR_REQUIRED")
        @Max(value = Short.MAX_VALUE, message = "TARGET_YEAR_MAXIMUM")
        @IsYearAfterCurrent
        Integer year,

        @Min(value = 0, message = "CO2_MINIMUM")
        Integer co2,

        @DecimalMin(value = "0", message = "RENEWABLE_ENERGY_RANGE")
        @DecimalMax(value = "100", message = "RENEWABLE_ENERGY_RANGE")
        @Digits(integer = 3, fraction = 1, message = "RENEWABLE_ENERGY_PRECISION")
        BigDecimal renewableEnergy,

        @DecimalMin(value = "0", message = "FOREST_RANGE")
        @DecimalMax(value = "100", message = "FOREST_RANGE")
        @Digits(integer = 3, fraction = 2, message = "FOREST_PRECISION")
        BigDecimal forest,

        @Min(value = 0, message = "PM25_MINIMUM")
        Integer pm25) {
}
