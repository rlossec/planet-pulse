BEGIN;

CREATE TABLE t_regions (
    region_id   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    region_name VARCHAR(10) NOT NULL,
    CONSTRAINT uq_regions_region_name
        UNIQUE (region_name)
);

CREATE TABLE t_subregions (
    subregion_id   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    region_id      INTEGER     NOT NULL,
    subregion_name VARCHAR(25) NOT NULL,
    CONSTRAINT uq_subregions_subregion_name
        UNIQUE (subregion_name),
    CONSTRAINT fk_subregions_region
        FOREIGN KEY (region_id)
        REFERENCES t_regions (region_id)
        ON DELETE RESTRICT
);

CREATE TABLE t_countries (
    country_id     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    iso_code_2     CHAR(2)       NOT NULL,
    country_name   VARCHAR(50)   NOT NULL,
    flag_url       TEXT          NOT NULL,
    area_km        NUMERIC(10,2) NOT NULL,
    population     INTEGER       NOT NULL,
    subregion_id   INTEGER       NOT NULL,
    CONSTRAINT uq_countries_iso_code_2
        UNIQUE (iso_code_2),
    CONSTRAINT uq_countries_country_name
        UNIQUE (country_name),
    CONSTRAINT uq_countries_flag_url
        UNIQUE (flag_url),
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

COMMIT;
