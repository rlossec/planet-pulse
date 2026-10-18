package co.simplon.planetpulse.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import co.simplon.planetpulse.dtos.AnnualIndicatorCreateDto;
import co.simplon.planetpulse.entities.AnnualIndicator;
import co.simplon.planetpulse.repositories.AnnualIndicatorRepository;

// @Service : dit à Spring « crée un objet de cette classe au démarrage et garde-le disponible ». Un tel objet géré par Spring s’appelle un bean.
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

        // Convert Integer to Short for pm25 from the DTO, since the entity expects a Short value
        Short pm25 = null;
        if (dto.getPm25() != null) {
            pm25 = dto.getPm25().shortValue();
        }

        AnnualIndicator indicator = new AnnualIndicator(dto.getIsoCode2(), year, dto.getCo2(),
                dto.getRenewableEnergy(), dto.getForest(), pm25);

        repository.save(indicator);
    }
}