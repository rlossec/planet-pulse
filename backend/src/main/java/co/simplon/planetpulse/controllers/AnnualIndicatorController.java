package co.simplon.planetpulse.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import co.simplon.planetpulse.dtos.AnnualIndicatorCreateDto;
import co.simplon.planetpulse.dtos.AnnualIndicatorDto;
import co.simplon.planetpulse.dtos.AnnualIndicatorUpdateDto;
import co.simplon.planetpulse.services.AnnualIndicatorService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/indicators")
public class AnnualIndicatorController {

    private final AnnualIndicatorService service;

    public AnnualIndicatorController(AnnualIndicatorService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody AnnualIndicatorCreateDto dto) {
        service.create(dto);
    }

    // @RequestParam : Spring lit isoCode2 dans l'URL (?isoCode2=FR), et renvoie une erreur 400 s'il est absent
    @GetMapping
    public List<AnnualIndicatorDto> getByCountry(@RequestParam String isoCode2) {
        return service.getByCountry(isoCode2);
    }

    // @PathVariable : l'id vient de l'URL ; @Valid : Spring applique les règles du DTO avant d'entrer dans la méthode
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable Integer id, @Valid @RequestBody AnnualIndicatorUpdateDto dto) {
        service.update(id, dto);
    }

    // @PathVariable : Spring lit l'id dans l'URL (/indicators/12) ; 204 = succès sans contenu à renvoyer
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}