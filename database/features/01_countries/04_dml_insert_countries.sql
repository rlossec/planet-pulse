-- Insert countries

INSERT INTO t_countries (
    iso_code_2,
    country_name,
    flag_url,
    area_km,
    population,
    subregion_id
)
VALUES
    (
        'FR',
        'France',
        'https://flagcdn.com/fr.svg',
        551695.00,
        68000000,
        (SELECT subregion_id FROM t_subregions WHERE LOWER(subregion_name) = LOWER('Western Europe'))
    ),
    (
        'DE',
        'Germany',
        'https://flagcdn.com/de.svg',
        357588.00,
        84000000,
        (SELECT subregion_id FROM t_subregions WHERE LOWER(subregion_name) = LOWER('Western Europe'))
    ),
    (
        'ES',
        'Spain',
        'https://flagcdn.com/es.svg',
        505990.00,
        48000000,
        (SELECT subregion_id FROM t_subregions WHERE LOWER(subregion_name) = LOWER('Southern Europe'))
    ),
    (
        'JP',
        'Japan',
        'https://flagcdn.com/jp.svg',
        377975.00,
        124000000,
        (SELECT subregion_id FROM t_subregions WHERE LOWER(subregion_name) = LOWER('Eastern Asia'))
    ),
    (
        'MA',
        'Morocco',
        'https://flagcdn.com/ma.svg',
        446550.00,
        37000000,
        (SELECT subregion_id FROM t_subregions WHERE LOWER(subregion_name) = LOWER('Northern Africa'))
    );