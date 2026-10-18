package co.simplon.planetpulse.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import co.simplon.planetpulse.dtos.AnnualIndicatorCreateDto;
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
}