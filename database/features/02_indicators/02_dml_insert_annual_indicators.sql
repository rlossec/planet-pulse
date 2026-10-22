-- Insert annual indicators
-- Illustrative values for development and testing only

INSERT INTO t_annual_indicators (
    iso_code_2,
    year_,
    co2_emission,
    renewable_energy_share,
    forest_area,
    pm25_exposure
)
VALUES
    ('FR', 2023, 3000, 22.5, 31.50, 10),
    ('DE', 2024, 6000, 45.0, 32.70, 11),
    ('ES', 2025, 2200, 24.0, 37.00, 9),
    ('JP', 2025, 10000, 22.0, 68.40, 12),
    ('MA', 2026, 700, 20.0, 12.60, 15);
