package co.simplon.planetpulse.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.simplon.planetpulse.dtos.ImportReportDto;
import co.simplon.planetpulse.dtos.integration.restcountries.RestCountry;
import co.simplon.planetpulse.entities.Country;
import co.simplon.planetpulse.entities.Region;
import co.simplon.planetpulse.entities.Subregion;
import co.simplon.planetpulse.mappers.CountryMapper;
import co.simplon.planetpulse.repositories.CountryRepository;
import co.simplon.planetpulse.repositories.RegionRepository;
import co.simplon.planetpulse.repositories.SubregionRepository;
import co.simplon.planetpulse.utils.NameUtils;
import co.simplon.planetpulse.validators.CountryImportValidator;

@Service
public class ImportCountriesService {

    private final CountryRepository countryRepository;
    private final RegionRepository regionRepository;
    private final SubregionRepository subregionRepository;
    private final CountryMapper mapper;
    private final CountryImportValidator validator;
    private final RestCountriesService service;

    public ImportCountriesService(CountryRepository countryRepository,
                                  RegionRepository regionRepository,
                                  SubregionRepository subregionRepository,
                                  RestCountriesService service,
                                  CountryMapper mapper,
                                  CountryImportValidator validator) {
        this.countryRepository = countryRepository;
        this.regionRepository = regionRepository;
        this.subregionRepository = subregionRepository;
        this.service = service;
        this.mapper = mapper;
        this.validator = validator;
    }

    @Transactional
    public ImportReportDto importCountries() {
        List<RestCountry> restCountries = service.getAllCountries();

        // 1- Filter out invalid countries
        List<RestCountry> validCountries = restCountries.stream()
                .filter(country -> validator.isValid(country))
                .toList();

        // 2- Map all regions and subregions
        
        List<Region> existingRegions = regionRepository.findAll();
        Map<String, Region> regions = new HashMap<>();
        for (Region region : existingRegions) {
            regions.put(NameUtils.normalize(region.getName()), region);
        }

        List<Subregion> existingSubregions = subregionRepository.findAll();
        Map<String, Subregion> subregions = new HashMap<>();
        for (Subregion subregion : existingSubregions) {
            subregions.put(NameUtils.normalize(subregion.getName()), subregion);
        }

        // Store the initial sizes of regions and subregions
        int initialRegions = regions.size();
        int initialSubregions = subregions.size();

        // 3- Create countries
        // Get all existing ISO codes
        Set<String> existingIsoCodes = countryRepository.findAllIsoCodes();
        // Create a list to store the countries to save
        List<Country> countriesToSave = new ArrayList<>();
        int skippedExisting = 0;

        for (RestCountry restCountry : validCountries) {
            String regionName = restCountry.region();
            String regionKey = NameUtils.normalize(regionName);
            Region region = regions.get(regionKey);
            if (region == null) {
                region = createRegion(regionName);
                regions.put(regionKey, region);
            }

            String subregionName = restCountry.subregion();
            String subregionKey = NameUtils.normalize(subregionName);
            Subregion subregion = subregions.get(subregionKey);
            if (subregion == null) {
                subregion = createSubregion(subregionName, region);
                subregions.put(subregionKey, subregion);
            }

            String isoCode = restCountry.codes().alpha_2();
            boolean isNewIsoCode = existingIsoCodes.add(isoCode);
            if (!isNewIsoCode) {
                skippedExisting++;
                continue;
            }
            countriesToSave.add(mapper.toEntity(restCountry, subregion));
        }

        countryRepository.saveAll(countriesToSave);

        return new ImportReportDto(
                restCountries.size(),
                restCountries.size() - validCountries.size(),
                skippedExisting,
                countriesToSave.size(),
                regions.size() - initialRegions,
                subregions.size() - initialSubregions);
    }

    private Region createRegion(String name) {
        Region region = new Region();
        region.setName(name);
        return regionRepository.save(region);
    }

    private Subregion createSubregion(String name, Region region) {
        Subregion subregion = new Subregion();
        subregion.setName(name);
        subregion.setRegion(region);
        return subregionRepository.save(subregion);
    }
}
