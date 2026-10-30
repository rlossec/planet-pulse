package co.simplon.planetpulse.controllers;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import co.simplon.planetpulse.services.ImportCountriesService;


@RestController
@RequestMapping("/import-data")
public class ImportCountriesController {

    public final ImportCountriesService service;

    public ImportCountriesController(ImportCountriesService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void importCountries() {
        service.importCountries();
    }

}
