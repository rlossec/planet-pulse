package co.simplon.planetpulse.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "t_countries")
public class Country {

    @Id
    @Column(name = "country_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name="country_name")
    String name;

    @Column(name="iso_code_2")
    String isoCode;

    @Column(name="flag_url")
    String flag;

    @Column(name="area_km")
    Double area;

    Integer population;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="subregion_id")
    Subregion subregion;

    public Country() {
        // Require for JPA
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public String getFlag() {
        return flag;
    }

    public Double getArea() {
        return area;
    }

    public Integer getPopulation() {
        return population;
    }

    public Subregion getSubregion() {
        return subregion;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public void setPopulation(Integer population) {
        this.population = population;
    }

    public void setSubregion(Subregion subregion) {
        this.subregion = subregion;
    }
}
