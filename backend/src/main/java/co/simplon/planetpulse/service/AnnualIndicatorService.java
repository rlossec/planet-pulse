package co.simplon.planetpulse.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import co.simplon.planetpulse.dtos.AnnualIndicatorCreateDto;
import co.simplon.planetpulse.entities.AnnualIndicator;
import co.simplon.planetpulse.repository.AnnualIndicatorRepository;

@Service
public class AnnualIndicatorService {

    private final AnnualIndicatorRepository repository;

    public AnnualIndicatorService(AnnualIndicatorRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void create(AnnualIndicatorCreateDto dto) {
        Short year = dto.getYear().shortValue();

        if (repository.existsByIsoCode2AndYear(dto.getIsoCode2(), year)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Indicators already exist for this country and year.");
        }

        Short pm25 = null;
        if (dto.getPm25() != null) {
            pm25 = dto.getPm25().shortValue();
        }

        AnnualIndicator indicator = new AnnualIndicator(dto.getIsoCode2(), year, dto.getCo2(),
                dto.getRenewableEnergy(), dto.getForest(), pm25);

        repository.save(indicator);
    }
}