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

//@RestontrollerAdvice une classe qui s’applique à tous les Controllers. Quand une exception remonte, Spring cherche ici une méthode qui sait la traiter, avant de répondre par défaut.
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    //@ExceptionHandler indique à Spring que cette méthode sait gérer une exception particulière. Quand une exception de ce type remonte, Spring appelle cette méthode pour construire la réponse HTTP.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.putIfAbsent(fieldError.getField(), fieldError.getDefaultMessage());
        }

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", "Validation failed.");
        body.put("errors", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleUnreadable() {
        return buildResponse(HttpStatus.BAD_REQUEST, "Request body is missing or malformed.");
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatus(ResponseStatusException ex) {
        return buildResponse(ex.getStatusCode(), ex.getReason());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrity(DataIntegrityViolationException ex) {
        String cause = ex.getMostSpecificCause().getMessage();

        if (cause != null && cause.contains("fk_annual_indicator_country")) {
            return buildResponse(HttpStatus.BAD_REQUEST, "Unknown country code.");
        }
        if (cause != null && cause.contains("uq_annual_indicator_country_year")) {
            return buildResponse(HttpStatus.CONFLICT,
                    "Indicators already exist for this country and year.");
        }

        LOGGER.error("Unexpected data integrity violation", ex);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected server error.");
    }

    private ResponseEntity<Map<String, Object>> buildResponse(HttpStatusCode status, String message) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", message);
        return ResponseEntity.status(status).body(body);
    }
}