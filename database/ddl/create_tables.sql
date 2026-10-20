BEGIN;





CREATE TABLE t_regions (
    region_id   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    region_name VARCHAR(10) NOT NULL,

    CREATE UNIQUE INDEX uq_regions_region_name_lower
        ON t_regions (LOWER(region_name));
);

CREATE TABLE t_subregions (
    subregion_id   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    region_id      INTEGER     NOT NULL,
    subregion_name VARCHAR(25) NOT NULL,

    CONSTRAINT fk_subregions_region
        FOREIGN KEY (region_id)
        REFERENCES t_regions (region_id)
        ON DELETE RESTRICT

    CREATE UNIQUE INDEX uq_subregions_region_id_subregion_name
        ON t_subregions (LOWER(subregion_name));

);

CREATE TABLE t_countries (
    country_id     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    iso_code_2     CHAR(2)       NOT NULL,
    country_name   VARCHAR(50)   NOT NULL,
    flag_url       TEXT          NOT NULL,
    area_km        NUMERIC(10,2) NOT NULL,
    population     INTEGER       NOT NULL,
    subregion_id   INTEGER       NOT NULL,

    CREATE UNIQUE INDEX uq_countries_iso_code_2
        ON t_countries (iso_code_2),

    CREATE UNIQUE INDEX uq_countries_flag_url
        ON t_countries (flag_url),

    CREATE UNIQUE INDEX uq_countries_country_name_lower
        ON t_countries (LOWER(country_name));

    CONSTRAINT fk_countries_subregion
        FOREIGN KEY (subregion_id)
        REFERENCES t_subregions (subregion_id)
        ON DELETE RESTRICT,

    CONSTRAINT ck_countries_iso_code_2
        CHECK (iso_code_2 ~ '^[A-Z]{2}$'),

    CONSTRAINT ck_countries_area_km
        CHECK (area_km > 0),

    CONSTRAINT ck_countries_population
        CHECK (population >= 0)
);

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

COMMIT;