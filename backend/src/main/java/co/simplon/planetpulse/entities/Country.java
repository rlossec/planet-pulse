package co.simplon.planetpulse.entities;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.FetchType;
import jakarta.persistence.GenerationType;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


import java.math.BigDecimal;

@Entity
@Table(name = "t_countries")
public class Country {

    @Id
    @Column(name = "country_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name="country_name")
    String name;

    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "iso_code_2", length = 2, nullable = false)
    String isoCode;

    @Column(name="flag_url")
    String flag;

    @Column(name="area_km")
    BigDecimal area;

    Long population;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="subregion_id")
    Subregion subregion;

    public Country() {
        // Require for JPA
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public BigDecimal getArea() {
        return area;
    }

    public void setArea(BigDecimal area) {
        this.area = area;
    }

    public Long getPopulation() {
        return population;
    }

    public void setPopulation(Long population) {
        this.population = population;
    }

    public Subregion getSubregion() {
        return subregion;
    }

    public void setSubregion(Subregion subregion) {
        this.subregion = subregion;
    }

}
