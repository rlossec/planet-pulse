package co.simplon.planetpulse.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import co.simplon.planetpulse.entities.AnnualIndicator;

public interface AnnualIndicatorRepository extends JpaRepository<AnnualIndicator, Integer> {

    boolean existsByIsoCode2AndYear(String isoCode2, Short year);
}
