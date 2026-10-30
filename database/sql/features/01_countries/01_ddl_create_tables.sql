CREATE TABLE t_regions (
    region_id   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    region_name VARCHAR(10) NOT NULL
);

CREATE UNIQUE INDEX uq_regions_region_name_lower
    ON t_regions (LOWER(region_name));

CREATE TABLE t_subregions (
    subregion_id   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    region_id      INTEGER     NOT NULL,
    subregion_name VARCHAR(25) NOT NULL,

    CONSTRAINT fk_subregions_region
        FOREIGN KEY (region_id)
        REFERENCES t_regions (region_id)
        ON DELETE RESTRICT

);

CREATE UNIQUE INDEX uq_subregions_region_id_subregion_name
    ON t_subregions (region_id, LOWER(subregion_name));

CREATE TABLE t_countries (
    country_id     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    iso_code_2     CHAR(2)       NOT NULL,
    country_name   VARCHAR(50)   NOT NULL,
    flag_url       TEXT          NOT NULL,
    area_km        NUMERIC(10,2) NOT NULL,
    population     INTEGER       NOT NULL,
    subregion_id   INTEGER       NOT NULL,

    CONSTRAINT fk_countries_subregion
        FOREIGN KEY (subregion_id)
        REFERENCES t_subregions (subregion_id)
        ON DELETE RESTRICT

);

CREATE UNIQUE INDEX uq_countries_country_name_lower
    ON t_countries (LOWER(country_name));
