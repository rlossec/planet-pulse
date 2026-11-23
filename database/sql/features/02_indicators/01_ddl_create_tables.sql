CREATE TABLE t_annual_indicators (
    indicator_id            INTEGER GENERATED ALWAYS AS IDENTITY,
    iso_code_2              CHAR(2)       NOT NULL,
    year_                   SMALLINT      NOT NULL,
    co2_emission            INTEGER,
    renewable_energy_share  DECIMAL(4,1),
    forest_area             DECIMAL(5,2),
    pm25_exposure           SMALLINT,

    CONSTRAINT pk_annual_indicators PRIMARY KEY (indicator_id),
    CONSTRAINT uq_annual_indicators_country_year UNIQUE (iso_code_2, year_),
    CONSTRAINT fk_annual_indicators_country FOREIGN KEY (iso_code_2) REFERENCES t_countries (iso_code_2)
);