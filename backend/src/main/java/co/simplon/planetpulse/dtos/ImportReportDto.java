package co.simplon.planetpulse.dtos;

public record ImportReportDto(
        int fetched,
        int rejected,
        int skippedExisting,
        int imported,
        int regionsCreated,
        int subregionsCreated) {
}
