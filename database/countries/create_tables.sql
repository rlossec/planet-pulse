
BEGIN;

CREATE TABLE t_regions (
    region_name VARCHAR(10) PRIMARY KEY
);

CREATE TABLE t_subregions (
    region_name    VARCHAR(10) NOT NULL,
    subregion_name VARCHAR(25) NOT NULL,

    PRIMARY KEY (region_name, subregion_name),

    CONSTRAINT t_subregions_region_fk
        FOREIGN KEY (region_name)
        REFERENCES t_regions (region_name)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE t_countries (
    iso_code_2     CHAR(2)       PRIMARY KEY,
    country_name   VARCHAR(50)   NOT NULL,
    flag_url       TEXT          NOT NULL,
    area_km        NUMERIC(10,2) NOT NULL,
    population     INTEGER       NOT NULL,
    region_name    VARCHAR(10)   NOT NULL,
    subregion_name VARCHAR(25)   NOT NULL,

    CONSTRAINT t_countries_flag_url_uq
        UNIQUE (flag_url),

    CONSTRAINT t_countries_subregion_fk
        FOREIGN KEY (region_name, subregion_name)
        REFERENCES t_subregions (region_name, subregion_name)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT t_countries_iso_code_2_ck
        CHECK (iso_code_2 ~ '^[A-Z]{2}$'),

    CONSTRAINT t_countries_area_km_ck
        CHECK (area_km > 0),

    CONSTRAINT t_countries_population_ck
        CHECK (population >= 0)
);


CREATE UNIQUE INDEX t_countries_country_name_uk
    ON t_countries (LOWER(country_name));

COMMIT;
