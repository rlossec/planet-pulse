package co.simplon.planetpulse.entities;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "t_annual_targets")
public class AnnualTarget {

    @Id
    @Column(name = "target_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "iso_code_2", referencedColumnName = "iso_code_2")
    private Country country;

    @Column(name = "year_")
    private Short year;

    @Column(name = "co2_emission")
    private Integer co2Emission;

    @Column(name = "renewable_energy_share")
    private BigDecimal renewableEnergyShare;

    @Column(name = "forest_area")
    private BigDecimal forestArea;

    @Column(name = "pm25_exposure")
    private Short pm25Exposure;

    protected AnnualTarget() {
    }

    public AnnualTarget(
            Country country,
            Short year,
            Integer co2Emission,
            BigDecimal renewableEnergyShare,
            BigDecimal forestArea,
            Short pm25Exposure) {
        this.country = country;
        this.year = year;
        this.co2Emission = co2Emission;
        this.renewableEnergyShare = renewableEnergyShare;
        this.forestArea = forestArea;
        this.pm25Exposure = pm25Exposure;
    }

    public Integer getId() {
        return id;
    }

    public Short getYear() {
        return year;
    }

    public Integer getCo2Emission() {
        return co2Emission;
    }

    public BigDecimal getRenewableEnergyShare() {
        return renewableEnergyShare;
    }

    public BigDecimal getForestArea() {
        return forestArea;
    }

    public Short getPm25Exposure() {
        return pm25Exposure;
    }

    public void setCo2Emission(Integer co2Emission) {
        this.co2Emission = co2Emission;
    }

    public void setRenewableEnergyShare(BigDecimal renewableEnergyShare) {
        this.renewableEnergyShare = renewableEnergyShare;
    }

    public void setForestArea(BigDecimal forestArea) {
        this.forestArea = forestArea;
    }

    public void setPm25Exposure(Short pm25Exposure) {
        this.pm25Exposure = pm25Exposure;
    }
}
