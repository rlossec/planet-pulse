package co.simplon.planetpulse.entities;

import java.math.BigDecimal;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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
@Table(name = "t_countries")
public class Country {

    @Id
    @Column(name = "country_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "country_name", nullable = false, length = 50)
    private String name;

    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "iso_code_2", length = 2, nullable = false)
    private String isoCode2;


    @Column(name = "flag_url", nullable = false)
    private String flag;

    @Column(name = "area_km", precision = 10, scale = 2, nullable = false)
    private BigDecimal area;

    @Column(name = "population", nullable = false)
    private Integer population;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subregion_id", nullable = false)
    private Subregion subregion;

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

    public String getIsoCode2() {
        return isoCode2;
    }

    public void setIsoCode2(String isoCode2) {
        this.isoCode2 = isoCode2;
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

    public Integer getPopulation() {
        return population;
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    public Subregion getSubregion() {
        return subregion;
    }

    public void setSubregion(Subregion subregion) {
        this.subregion = subregion;
    }

}
