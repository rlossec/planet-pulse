CREATE TABLE t_annual_indicators (
    id                      INTEGER GENERATED ALWAYS AS IDENTITY,
    iso_code_2              CHAR(2)       NOT NULL,
    year_                   SMALLINT      NOT NULL,
    co2_emission            INTEGER,
    renewable_energy_share  DECIMAL(4,1),
    forest_area             DECIMAL(5,2),
    pm25_exposure           SMALLINT,

    CONSTRAINT pk_annual_indicator PRIMARY KEY (id),
    CONSTRAINT uq_annual_indicator_country_year UNIQUE (iso_code_2, year_),
    CONSTRAINT fk_annual_indicator_country FOREIGN KEY (iso_code_2) REFERENCES t_countries (iso_code_2),

    CONSTRAINT ck_annual_indicator_year CHECK (year_ BETWEEN 1850 AND 2150),
    CONSTRAINT ck_annual_indicator_co2 CHECK (co2_emission BETWEEN 0 AND 100000),
    CONSTRAINT ck_annual_indicator_renewable CHECK (renewable_energy_share BETWEEN 0 AND 100),
    CONSTRAINT ck_annual_indicator_forest CHECK (forest_area BETWEEN 0 AND 100),
    CONSTRAINT ck_annual_indicator_pm25 CHECK (pm25_exposure BETWEEN 0 AND 300),
    CONSTRAINT ck_annual_indicator_at_least_one CHECK (
        co2_emission IS NOT NULL
        OR renewable_energy_share IS NOT NULL
        OR forest_area IS NOT NULL
        OR pm25_exposure IS NOT NULL
    )
);