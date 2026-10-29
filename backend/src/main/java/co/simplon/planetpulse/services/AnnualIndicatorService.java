package co.simplon.planetpulse.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import co.simplon.planetpulse.dtos.AnnualIndicatorCreateDto;
import co.simplon.planetpulse.dtos.AnnualIndicatorDto;
import co.simplon.planetpulse.dtos.AnnualIndicatorUpdateDto;
import co.simplon.planetpulse.entities.AnnualIndicator;
import co.simplon.planetpulse.entities.Country;
import co.simplon.planetpulse.repositories.AnnualIndicatorRepository;
import co.simplon.planetpulse.repositories.CountryRepository;

// @Service : dit à Spring « crée un objet de cette classe au démarrage et garde-le disponible ». Un tel objet géré par Spring s’appelle un bean.
@Service
public class AnnualIndicatorService {

    private final AnnualIndicatorRepository repository;
    private final CountryRepository countryRepository;

    public AnnualIndicatorService(AnnualIndicatorRepository repository, CountryRepository countryRepository) {
        this.repository = repository;
        this.countryRepository = countryRepository;
    }

    @Transactional
    public void create(AnnualIndicatorCreateDto dto) {
        Short year = dto.year().shortValue();

        Country country = countryRepository.findByIsoCode2(dto.isoCode2())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "UNKNOWN_COUNTRY_CODE"));


        // Convert Integer to Short for pm25 from the DTO, since the entity expects a Short value
        Short pm25 = null;
        if (dto.pm25() != null) {
            pm25 = dto.pm25().shortValue();
        }

        AnnualIndicator indicator = new AnnualIndicator(country, year, dto.co2(),
                dto.renewableEnergy(), dto.forest(), pm25);

        repository.save(indicator);
    }

    // readOnly = true : on ne fait que lire, la transaction n'a pas besoin d'écrire en base
    @Transactional(readOnly = true)
    public List<AnnualIndicatorDto> getByCountry(String isoCode2) {
        return repository.findByCountry_IsoCode2OrderByYearDesc(isoCode2)
                .stream()
                .map(indicator -> new AnnualIndicatorDto(
                        indicator.getId(),
                        indicator.getYear(),
                        indicator.getCo2Emission(),
                        indicator.getRenewableEnergyShare(),
                        indicator.getForestArea(),
                        indicator.getPm25Exposure()))
                .toList();
    }

    @Transactional
    public void update(Integer id, AnnualIndicatorUpdateDto dto) {
        AnnualIndicator indicator = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "INDICATOR_NOT_FOUND"));

        // Convert Integer to Short for pm25 from the DTO, since the entity expects a Short value
        Short pm25 = null;
        if (dto.pm25() != null) {
            pm25 = dto.pm25().shortValue();
        }

        // The entity is managed, so Hibernate sends the UPDATE at the end of the transaction.
        indicator.setCo2Emission(dto.co2());
        indicator.setRenewableEnergyShare(dto.renewableEnergy());
        indicator.setForestArea(dto.forest());
        indicator.setPm25Exposure(pm25);
    }

    @Transactional
    public void delete(Integer id) {
        // Without this check, deleting an unknown id would silently do nothing
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "INDICATOR_NOT_FOUND");
        }

        repository.deleteById(id);
    }
}