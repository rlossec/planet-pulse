package co.simplon.planetpulse.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import co.simplon.planetpulse.entities.Country;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
