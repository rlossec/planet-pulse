package co.simplon.planetpulse.entities;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "t_countries")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "country_id")
    private Integer id;

    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(name = "iso_code_2")
    private String isoCode2;

    protected Country() {
    }

    public Integer getId() {
        return id;
    }

    public String getIsoCode2() {
        return isoCode2;
    }
}
