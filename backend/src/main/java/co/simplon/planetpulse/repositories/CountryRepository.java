package co.simplon.planetpulse.repositories;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import co.simplon.planetpulse.entities.Country;

public interface CountryRepository extends JpaRepository<Country, Integer> {

    Optional<Country> findByIsoCode2(String isoCode2);

    // JPQL query to get all ISO codes
    @Query("SELECT c.isoCode2 FROM Country c")
    Set<String> findAllIsoCodes();

}
