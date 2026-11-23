package co.simplon.planetpulse.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.simplon.planetpulse.entities.Country;

public interface CountryRepository extends JpaRepository<Country, Integer> {

    Optional<Country> findByIsoCode2(String isoCode2);
}
