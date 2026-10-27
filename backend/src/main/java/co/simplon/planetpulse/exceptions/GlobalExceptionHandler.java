package co.simplon.planetpulse.exceptions;

import java.util.LinkedHashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import co.simplon.planetpulse.dtos.ApiErrorDto;

//@RestontrollerAdvice une classe qui s’applique à tous les Controllers.
//Quand une exception remonte, Spring cherche ici une méthode qui sait la traiter, avant de répondre par défaut.
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    //@ExceptionHandler indique à Spring que cette méthode sait gérer une exception particulière. 
    //Quand une exception de ce type remonte, Spring appelle cette méthode pour construire la réponse HTTP.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorDto> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.putIfAbsent(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiErrorDto("VALIDATION_FAILED", errors));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorDto> handleUnreadable() {
        return buildResponse(HttpStatus.BAD_REQUEST, "REQUEST_BODY_INVALID");
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiErrorDto> handleResponseStatus(ResponseStatusException ex) {
        return buildResponse(ex.getStatusCode(), ex.getReason() == null
                ? "UNEXPECTED_ERROR"
                : ex.getReason());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiErrorDto> handleDataIntegrity(DataIntegrityViolationException ex) {
        String cause = ex.getMostSpecificCause().getMessage();

        if (cause != null && cause.contains("fk_annual_indicator_country")) {
            return buildResponse(HttpStatus.BAD_REQUEST, "UNKNOWN_COUNTRY_CODE");
        }
        if (cause != null && cause.contains("uq_annual_indicator_country_year")) {
            return buildResponse(HttpStatus.CONFLICT, "INDICATOR_ALREADY_EXISTS");
        }

        LOGGER.error("Unexpected data integrity violation", ex);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "UNEXPECTED_ERROR");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorDto> handleUnexpected(Exception ex) {
        LOGGER.error("Unexpected API error", ex);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "UNEXPECTED_ERROR");
    }

    private ResponseEntity<ApiErrorDto> buildResponse(HttpStatusCode status, String code) {
        return ResponseEntity.status(status).body(new ApiErrorDto(code, Map.of()));
    }
}