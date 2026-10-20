# Database — PlanetPulse

## 1. Purpose

The `database/` directory contains the SQL scripts required to create, initialize, validate, and populate the PlanetPulse database.

The scripts are organized by responsibility to facilitate local development, testing, and schema maintenance.

## 2. Structure

```text
database/
├── ddl/
├── countries/
├── indicators/
├── fixtures/
├── inserts/
├── checks/
├── local/
└── README.md
```

| Directory | Purpose |
|---|---|
| `ddl/` | Schema and table creation |
| `countries/` | Legacy or country-specific scripts |
| `indicators/` | Indicator-specific scripts |
| `inserts/` | SQL scripts for inserting data |
| `checks/` | Connection, schema, and data validation |
| `local/` | Local environment initialization |

## 3. Execution Order

The insertion scripts must be executed after the tables have been created, in the following order:

1. `ddl/create_tables.sql`
2. `inserts/01_insert_regions.sql`
3. `inserts/02_insert_subregions.sql`
4. `inserts/03_insert_countries.sql`
5. `inserts/04_insert_annual_indicators.sql`

The relationships between tables determine this order:

- Subregions reference regions.
- Countries reference subregions.
- Annual indicators reference countries through their two-letter ISO codes.

The filenames are prefixed with numbers to make the execution order explicit.

## 4. Running Scripts with PostgreSQL

The following examples assume that PostgreSQL is installed and the database already exists.

### Check the Connection

```bash
psql -h localhost -p 5432 -U postgres -d planet_pulse -f database/checks/check_connection.sql
```

Adjust the host, port, username, and database name to match your environment.

### Create the Tables

```bash
psql -h localhost -p 5432 -U postgres -d planet_pulse -f database/ddl/create_tables.sql
```

### Insert Reference Data

```bash
psql -h localhost -p 5432 -U postgres -d planet_pulse -f database/inserts/01_insert_regions.sql
psql -h localhost -p 5432 -U postgres -d planet_pulse -f database/inserts/02_insert_subregions.sql
psql -h localhost -p 5432 -U postgres -d planet_pulse -f database/inserts/03_insert_countries.sql
psql -h localhost -p 5432 -U postgres -d planet_pulse -f database/inserts/04_insert_annual_indicators.sql
```

## 5. Available Checks

The scripts in the `checks/` directory are used to:

- Verify database connectivity.
- Check that the expected tables exist.
- Detect missing data or potential duplicates.

Validation scripts must not modify the database schema or its data.
