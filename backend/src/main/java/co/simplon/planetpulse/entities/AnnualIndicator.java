package co.simplon.planetpulse.entities;

import java.math.BigDecimal;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "t_annual_indicators")
public class AnnualIndicator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "iso_code_2", length = 2, nullable = false)
    private String isoCode2;

    @Column(name = "year_", nullable = false)
    private Short year;

    @Column(name = "co2_emission")
    private Integer co2Emission;

    @Column(name = "renewable_energy_share", precision = 4, scale = 1)
    private BigDecimal renewableEnergyShare;

    @Column(name = "forest_area", precision = 5, scale = 2)
    private BigDecimal forestArea;

    @Column(name = "pm25_exposure")
    private Short pm25Exposure;

    // Constructeur vide : obligatoire pour Hibernate, qui crée les objets lui-même
    protected AnnualIndicator() {
    }

    // Constructeur que notre code utilisera (sans l'id, généré par la base)
    public AnnualIndicator(String isoCode2, Short year, Integer co2Emission,
            BigDecimal renewableEnergyShare, BigDecimal forestArea, Short pm25Exposure) {
        this.isoCode2 = isoCode2;
        this.year = year;
        this.co2Emission = co2Emission;
        this.renewableEnergyShare = renewableEnergyShare;
        this.forestArea = forestArea;
        this.pm25Exposure = pm25Exposure;
    }

    public Integer getId() {
        return id;
    }

    public String getIsoCode2() {
        return isoCode2;
    }

    public Short getYear() {
        return year;
    }

    public Integer getCo2Emission() {
        return co2Emission;
    }

    public void setCo2Emission(Integer co2Emission) {
        this.co2Emission = co2Emission;
    }

    public BigDecimal getRenewableEnergyShare() {
        return renewableEnergyShare;
    }

    public void setRenewableEnergyShare(BigDecimal renewableEnergyShare) {
        this.renewableEnergyShare = renewableEnergyShare;
    }

    public BigDecimal getForestArea() {
        return forestArea;
    }

    public void setForestArea(BigDecimal forestArea) {
        this.forestArea = forestArea;
    }

    public Short getPm25Exposure() {
        return pm25Exposure;
    }

    public void setPm25Exposure(Short pm25Exposure) {
        this.pm25Exposure = pm25Exposure;
    }
}
