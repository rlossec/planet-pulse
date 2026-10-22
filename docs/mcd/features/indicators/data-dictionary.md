# Data dictionary: `t_annual_indicators`

One row stores the environmental indicator values recorded for one country in one year. Indicator values are optional individually, but at least one must be provided for each row.

| Conceptual name | Logical name | Description | Example | Data type | PostgreSQL type | PK | NOT NULL | Generation / relationship | Minimum | Maximum |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: | ---: |
| Indicator record ID | `id` | Unique identifier for an annual indicator record | `42` | Integer | `INTEGER` | Yes | Yes | Identity, generated always | 1 | 2,147,483,647 |
| Country ISO code | `iso_code_2` | ISO 3166-1 alpha-2 code of the country this record belongs to | `FR` | Text | `CHAR(2)` |  | Yes | Foreign key to `t_countries.iso_code_2` |  |  |
| Year | `year_` | Calendar year for the indicator values; future years are rejected using the current calendar year | `2024` | Integer | `SMALLINT` |  | Yes |  | 1850 | Current year |
| CO2 emissions | `co2_emission` | Annual CO2 emissions, in million tonnes | `3000` | Integer | `INTEGER` |  | No |  | 0 | 100000 |
| Renewable energy share | `renewable_energy_share` | Renewable energy as a percentage of final consumption | `22.5` | Decimal | `DECIMAL(4,1)` |  | No | Precision 1 decimal place | 0 | 100 |
| Forest area | `forest_area` | Forest area as a percentage of land area | `31.50` | Decimal | `DECIMAL(5,2)` |  | No | Precision 2 decimal places | 0 | 100 |
| PM2.5 exposure | `pm25_exposure` | Population exposure to PM2.5, in micrograms per cubic metre | `10` | Integer | `SMALLINT` |  | No |  | 0 | 300 |

## Table constraints

- Primary key: `id`.
- Unique record per country and year: (`iso_code_2`, `year_`). The pair is unique; neither column is unique on its own.
- Foreign key: `iso_code_2` references `t_countries.iso_code_2`.
- `year_` must be 1850 or later and cannot be later than the current calendar year when submitted.
- `co2_emission` must be between 0 and 100000 when provided.
- `renewable_energy_share` and `forest_area` must each be between 0 and 100 when provided.
- `pm25_exposure` must be between 0 and 300 when provided.
- At least one of `co2_emission`, `renewable_energy_share`, `forest_area`, or `pm25_exposure` must be provided.

The current DDL in `database/features/02_indicators/01_ddl_create_tables.sql` declares the columns, identity, primary key, country/year unique constraint, and country foreign key, but does not yet declare the range checks or the at-least-one-indicator check above. Add those `CHECK` constraints to the DDL if the database itself must enforce all documented business rules.
