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

import co.simplon.planetpulse.dtos.AnnualTargetCreateDto;
import co.simplon.planetpulse.dtos.AnnualTargetDto;
import co.simplon.planetpulse.dtos.AnnualTargetUpdateDto;
import co.simplon.planetpulse.services.AnnualTargetService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/targets")
public class AnnualTargetController {

    private final AnnualTargetService service;

    public AnnualTargetController(AnnualTargetService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody AnnualTargetCreateDto dto) {
        service.create(dto);
    }

    @GetMapping
    public List<AnnualTargetDto> getByCountry(@RequestParam String isoCode2) {
        return service.getByCountry(isoCode2);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable Integer id, @Valid @RequestBody AnnualTargetUpdateDto dto) {
        service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
