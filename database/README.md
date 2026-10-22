# Database — PlanetPulse

## 1. Purpose

The `database/` directory contains the SQL scripts required to create, initialize, validate, and populate the PlanetPulse database.

The scripts are grouped by feature, so that each feature owns its tables, its reference data, and its reset scripts.

## 2. Structure

```text
database/
├── README.md
├── run.ps1                     # Runner (Windows / PowerShell)
├── run.sh                      # Runner (Linux / macOS / Git Bash)
├── setup/
│   └── 00_create_database.sql
├── features/
│   ├── 01_countries/
│   │   ├── 01_ddl_create_tables.sql
│   │   ├── 02_dml_insert_regions.sql
│   │   ├── 03_dml_insert_subregions.sql
│   │   ├── 04_dml_insert_countries.sql
│   │   └── reset/
│   │       ├── ddl_drop_tables.sql
│   │       └── ddl_truncate_tables.sql
│   └── 02_indicators/
│       ├── 01_ddl_create_tables.sql
│       ├── 02_dml_insert_annual_indicators.sql
│       └── reset/
│           ├── ddl_drop_tables.sql
│           └── ddl_truncate_tables.sql
└── checks/
    └── dql_check_connection.sql
```

| Directory                        | Purpose                                                     |
| -------------------------------- | ----------------------------------------------------------- |
| `setup/`                         | Database creation, run once against the `postgres` database |
| `features/<NN>_<feature>/`       | Tables and reference data of one feature                    |
| `features/<NN>_<feature>/reset/` | Drop and truncate scripts, never run by default             |
| `checks/`                        | Connection, schema, and data validation                     |

## 3. Naming Conventions

Feature folders are prefixed with a number: features run in that order. A feature that references another one must have a higher number (`02_indicators` references `01_countries`).

Scripts follow the pattern `<order>_<type>_<action>_<object>.sql`:

| Type  | Content                               |
| ----- | ------------------------------------- |
| `ddl` | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| `dml` | `INSERT`, `UPDATE`, `DELETE`          |
| `dql` | `SELECT` only                         |
| `dcl` | `GRANT`, `REVOKE`                     |

Scripts in `reset/` and `checks/` have no order prefix: they are run on demand.

## 4. Transactions

Scripts do not contain `BEGIN` / `COMMIT`. The runners execute each script with `psql --single-transaction -v ON_ERROR_STOP=1`: a script is applied entirely or not at all, and the run stops at the first error.

`setup/00_create_database.sql` is the exception: `CREATE DATABASE` cannot run inside a transaction, so it is run manually.

## 5. Running Scripts

The examples assume that PostgreSQL is installed and `psql` is in the `PATH`. The password is read from the `PGPASSWORD` environment variable or from the `pgpass` file.

### Create the Database

```bash
psql -h localhost -p 5432 -U postgres -d postgres -f database/setup/00_create_database.sql
```

### Run the Feature Scripts

| Action          | Scripts executed                                              |
| --------------- | ------------------------------------------------------------- |
| `all` (default) | Every `ddl` and `dml` script, feature by feature              |
| `schema`        | `ddl` scripts only                                            |
| `data`          | `dml` scripts only                                            |
| `reset`         | `reset/ddl_drop_tables.sql` of each feature, in reverse order |

PowerShell:

```powershell
./database/run.ps1
./database/run.ps1 -Action reset
./database/run.ps1 -Action schema -HostName localhost -Port 5432 -User postgres -Database planet_pulse
```

Bash:

```bash
./database/run.sh
./database/run.sh reset
PGUSER=postgres PGDATABASE=planet_pulse ./database/run.sh schema
```

### Check the Connection

```bash
psql -h localhost -p 5432 -U postgres -d planet_pulse -f database/checks/dql_check_connection.sql
```

## 6. Adding a Feature

1. Create `features/<NN>_<feature>/` with the next free number.
2. Add `01_ddl_create_tables.sql`, then the `dml` scripts in dependency order.
3. Add `reset/ddl_drop_tables.sql` and `reset/ddl_truncate_tables.sql`.

The runners pick up the new folder automatically.

## 7. Available Checks

The scripts in the `checks/` directory are used to:

- Verify database connectivity.
- Check that the expected tables exist.
- Detect missing data or potential duplicates.

Validation scripts must not modify the database schema or its data.
