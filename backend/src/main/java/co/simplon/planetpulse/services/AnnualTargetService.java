package co.simplon.planetpulse.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import co.simplon.planetpulse.dtos.AnnualTargetCreateDto;
import co.simplon.planetpulse.dtos.AnnualTargetDto;
import co.simplon.planetpulse.dtos.AnnualTargetUpdateDto;
import co.simplon.planetpulse.entities.AnnualTarget;
import co.simplon.planetpulse.entities.Country;
import co.simplon.planetpulse.repositories.AnnualTargetRepository;
import co.simplon.planetpulse.repositories.CountryRepository;

@Service
public class AnnualTargetService {

    private final AnnualTargetRepository repository;
    private final CountryRepository countryRepository;

    public AnnualTargetService(
            AnnualTargetRepository repository,
            CountryRepository countryRepository) {
        this.repository = repository;
        this.countryRepository = countryRepository;
    }

    @Transactional
    public void create(AnnualTargetCreateDto dto) {
        Short year = dto.year().shortValue();
        Country country = countryRepository.findByIsoCode2(dto.isoCode2())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "UNKNOWN_COUNTRY_CODE"));

        Short pm25 = dto.pm25() == null ? null : dto.pm25().shortValue();
        repository.save(new AnnualTarget(
                country, year, dto.co2(), dto.renewableEnergy(), dto.forest(), pm25));
    }

    @Transactional(readOnly = true)
    public List<AnnualTargetDto> getByCountry(String isoCode2) {
        return repository.findByCountry_IsoCode2OrderByYearDesc(isoCode2)
                .stream()
                .map(target -> new AnnualTargetDto(
                        target.getId(),
                        target.getYear(),
                        target.getCo2Emission(),
                        target.getRenewableEnergyShare(),
                        target.getForestArea(),
                        target.getPm25Exposure()))
                .toList();
    }

    @Transactional
    public void update(Integer id, AnnualTargetUpdateDto dto) {
        AnnualTarget target = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "TARGET_NOT_FOUND"));

        Short pm25 = dto.pm25() == null ? null : dto.pm25().shortValue();
        target.setCo2Emission(dto.co2());
        target.setRenewableEnergyShare(dto.renewableEnergy());
        target.setForestArea(dto.forest());
        target.setPm25Exposure(pm25);
    }

    @Transactional
    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "TARGET_NOT_FOUND");
        }
        repository.deleteById(id);
    }
}
