package co.simplon.planetpulse.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.simplon.planetpulse.dtos.ImportReportDto;
import co.simplon.planetpulse.services.ImportCountriesService;

@RestController
@RequestMapping("/import-data")
public class ImportCountriesController {

    private final ImportCountriesService service;

    public ImportCountriesController(ImportCountriesService service) {
        this.service = service;
    }

    @PostMapping
    public ImportReportDto importCountries() {
        return service.importCountries();
    }

}
