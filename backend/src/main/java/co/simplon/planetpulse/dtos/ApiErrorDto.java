package co.simplon.planetpulse.dtos;

import java.util.Map;

public record ApiErrorDto(String code, Map<String, String> errors) {
}
