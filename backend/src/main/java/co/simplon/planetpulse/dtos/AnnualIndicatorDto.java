package co.simplon.planetpulse.dtos;

import java.math.BigDecimal;

public record AnnualIndicatorDto(
        Integer id,
        Short year,
        Integer co2,
        BigDecimal renewableEnergy,
        BigDecimal forest,
        Short pm25) {
}
