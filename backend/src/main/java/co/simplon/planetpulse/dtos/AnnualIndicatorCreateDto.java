package co.simplon.planetpulse.dtos;

import java.math.BigDecimal;
import java.time.Year;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class AnnualIndicatorCreateDto {

    @NotBlank(message = "Country code is required.")
    @Pattern(regexp = "[A-Z]{2}", message = "Country code must be 2 uppercase letters.")
    private String isoCode2;

    @NotNull(message = "Year is required.")
    @Min(value = 1850, message = "Year must be 1850 or later.")
    private Integer year;

    @Min(value = 0, message = "Minimum CO2 annual emissions is 0.")
    private Integer co2;

    @DecimalMin(value = "0", message = "Renewable energy must be between 0 and 100.")
    @DecimalMax(value = "100", message = "Renewable energy must be between 0 and 100.")
    @Digits(integer = 3, fraction = 1, message = "Renewable energy must have at most 1 decimal.")
    private BigDecimal renewableEnergy;

    @DecimalMin(value = "0", message = "Forest area value must be between 0 and 100.")
    @DecimalMax(value = "100", message = "Forest area must be between 0 and 100.")
    @Digits(integer = 3, fraction = 2, message = "Forest area must have at most 2 decimals.")
    private BigDecimal forest;

    @Min(value = 0, message = "Minimum PM2.5 emissions is 0.")
    private Integer pm25;

    public AnnualIndicatorCreateDto() {
    }

    @AssertTrue(message = "At least one indicator value must be provided.")
    public boolean isAtLeastOneIndicatorProvided() {
        return co2 != null || renewableEnergy != null || forest != null || pm25 != null;
    }

    @AssertTrue(message = "Year cannot be in the future.")
    public boolean isYearNotInFuture() {
        return year == null || year <= Year.now().getValue();
    }

    public String getIsoCode2() {
        return isoCode2;
    }

    public void setIsoCode2(String isoCode2) {
        this.isoCode2 = isoCode2;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getCo2() {
        return co2;
    }

    public void setCo2(Integer co2) {
        this.co2 = co2;
    }

    public BigDecimal getRenewableEnergy() {
        return renewableEnergy;
    }

    public void setRenewableEnergy(BigDecimal renewableEnergy) {
        this.renewableEnergy = renewableEnergy;
    }

    public BigDecimal getForest() {
        return forest;
    }

    public void setForest(BigDecimal forest) {
        this.forest = forest;
    }

    public Integer getPm25() {
        return pm25;
    }

    public void setPm25(Integer pm25) {
        this.pm25 = pm25;
    }
}