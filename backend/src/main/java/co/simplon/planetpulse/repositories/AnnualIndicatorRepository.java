package co.simplon.planetpulse.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import co.simplon.planetpulse.entities.AnnualIndicator;

public interface AnnualIndicatorRepository extends JpaRepository<AnnualIndicator, Integer> {

    boolean existsByCountry_IsoCode2AndYear(String isoCode2, Short year);

    List<AnnualIndicator> findByCountry_IsoCode2OrderByYearDesc(String isoCode2);
}