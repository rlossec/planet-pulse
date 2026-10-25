package co.simplon.planetpulse.dtos;

import java.math.BigDecimal;

public class AnnualIndicatorDto {

    private Integer id;
    private Short year;
    private Integer co2;
    private BigDecimal renewableEnergy;
    private BigDecimal forest;
    private Short pm25;

    public AnnualIndicatorDto(Integer id, Short year, Integer co2, BigDecimal renewableEnergy,
            BigDecimal forest, Short pm25) {
        this.id = id;
        this.year = year;
        this.co2 = co2;
        this.renewableEnergy = renewableEnergy;
        this.forest = forest;
        this.pm25 = pm25;
    }

    public Integer getId() {
        return id;
    }

    public Short getYear() {
        return year;
    }

    public Integer getCo2() {
        return co2;
    }

    public BigDecimal getRenewableEnergy() {
        return renewableEnergy;
    }

    public BigDecimal getForest() {
        return forest;
    }

    public Short getPm25() {
        return pm25;
    }
}