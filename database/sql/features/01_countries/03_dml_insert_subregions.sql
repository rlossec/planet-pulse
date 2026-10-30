-- Insert subregions

INSERT INTO t_subregions (region_id, subregion_name)
VALUES
    (
        (SELECT region_id FROM t_regions WHERE LOWER(region_name) = LOWER('Europe')),
        'Western Europe'
    ),
    (
        (SELECT region_id FROM t_regions WHERE LOWER(region_name) = LOWER('Europe')),
        'Southern Europe'
    ),
    (
        (SELECT region_id FROM t_regions WHERE LOWER(region_name) = LOWER('Asia')),
        'Eastern Asia'
    ),
    (
        (SELECT region_id FROM t_regions WHERE LOWER(region_name) = LOWER('Africa')),
        'Northern Africa'
    );
