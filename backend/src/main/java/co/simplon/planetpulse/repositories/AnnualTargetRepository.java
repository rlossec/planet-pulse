package co.simplon.planetpulse.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import co.simplon.planetpulse.entities.AnnualTarget;

public interface AnnualTargetRepository extends JpaRepository<AnnualTarget, Integer> {

    boolean existsByCountry_IsoCode2AndYear(String isoCode2, Short year);

    List<AnnualTarget> findByCountry_IsoCode2OrderByYearDesc(String isoCode2);
}
