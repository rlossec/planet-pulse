# Data dictionary — Countries

| Conceptual name | Logical name   | Description                     | Examples                                        | Data type | Size | PG type        | PK  | NOT NULL | UNIQUE | ELEMENTARY | min | max           | Max order of magnitude |
| --------------- | -------------- | ------------------------------- | ----------------------------------------------- | --------- | ---- | -------------- | --- | -------- | ------ | ---------- | --- | ------------- | ---------------------- |
| ISO code        | `iso_code_2`   | ISO 3166-1 alpha-2 country code | `AF`, `FR`                                      | Text      | 2    | `CHAR(2)`      | 1   | 1        | 1      | 1          |     |               |                        |
| Country name    | `country_name` | Common country name             | Afghanistan                                     | Text      | 50   | `VARCHAR(50)`  |     | 1        | 1      | 1          |     |               |                        |
| Country flag    | `flag_url`     | Flag URL (SVG)                  | `https://flags.restcountries.com/v5/svg/af.svg` | Text      |      | `TEXT`         |     | 1        | 1      | 1          |     |               |                        |
| Region          | `region`       | World region                    | Asia, Europe                                    | Text      | 9    | `VARCHAR(8)`   |     | 1        |        | 1          |     |               |                        |
| Sub region      | `subregion`    | World subregion                 | Southern Asia                                   | Text      | 25   | `VARCHAR(25)`  |     | 1        |        | 1          |     |               |                        |
| Area            | `area_km`      | Country area in km²             | 652230                                          | Decimal   | 8,2  | `NUMERIC(8,2)` |     | 1        |        | 1          | 0   | 99 999 999.99 | ≈ 17 100 000           |
| Population      | `population`   | Number of inhabitants           | 43844000                                        | Integer   | 10   | `INTEGER`      |     | 1        |        | 1          | 0   | 2 147 483 647 | ≈ 1 470 000 000        |

### JSON source mapping

| JSON field        | Logical property |
| ----------------- | ---------------- |
| `codes.alpha_2`   | `iso_code_2`     |
| `names.common`    | `country_name`   |
| `flag.url_svg`    | `flag_url`       |
| `region`          | `region`         |
| `subregion`       | `subregion`      |
| `area.kilometers` | `area_km`        |
| `population`      | `population`     |
