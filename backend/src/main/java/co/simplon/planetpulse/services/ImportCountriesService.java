package co.simplon.planetpulse.services;

import co.simplon.planetpulse.dtos.integration.restcountries.RestCountry;
import co.simplon.planetpulse.mappers.CountryMapper;
import co.simplon.planetpulse.repositories.CountryRepository;
import co.simplon.planetpulse.repositories.RegionRepository;
import co.simplon.planetpulse.repositories.SubregionRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImportCountriesService {

    private final CountryRepository countryRepository;
    private final RegionRepository regionRepository;
    private final SubregionRepository subregionRepository;
    private final CountryMapper mapper;
    private final RestCountriesService service;

    public ImportCountriesService(CountryRepository countryRepository,
                                  RegionRepository regionRepository,
                                  SubregionRepository subregionRepository,
                                  RestCountriesService service,
                                  CountryMapper mapper) {

        this.countryRepository = countryRepository;
        this.regionRepository = regionRepository;
        this.subregionRepository = subregionRepository;
        this.service = service;
        this.mapper = mapper;

    }

    public void importCountries() {
        // 1. Fetch countries
        List<RestCountry> restCountries = service.getAllCountries();
        System.out.println(restCountries);

        // 2. Cleaning : validate and exclude country with empty field -
        // 3. Hasmap for existing regions/subregions

        // 4. Boucler sur les pays
            // Trouver sa région dans le map / Créer si non existante
            // Trouver sa sous region / Créer si non existante
            // Enregistrer le pays ?


        //List<Country> countryEntities = mapper.toEntity(restCountries);

        // Persister les pays


    }


}
