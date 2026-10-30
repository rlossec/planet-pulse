# Database — PlanetPulse

## 1. Purpose

The `database/` directory contains everything required to create, initialize, validate, and populate the PlanetPulse database:

- `sql/` holds the SQL files, grouped by feature, so that each feature owns its tables, its reference data, and its reset scripts;
- `scripts/` holds the Bash runners that execute them (Linux, macOS, and Git Bash on Windows).

## 2. Structure

```text
database/
├── README.md
├── scripts/
│   ├── _common.sh              # Connection and SQL execution
│   ├── 00_init.sh
│   ├── 01_check_connection.sh
│   ├── 02_create.sh
│   ├── 03_check_tables.sh
│   ├── 04_insert.sh
│   ├── drop_database.sh
│   ├── drop_tables.sh
│   ├── test.sh
│   └── scenarios/
│       ├── 01_full_restart.sh
│       ├── 02_data_restart.sh
│       ├── 03_tables_restart.sh
│       └── README.md
└── sql/
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
    │   ├── 02_indicators/
    │   │   ├── 01_ddl_create_tables.sql
    │   │   ├── 02_dml_insert_annual_indicators.sql
    │   │   └── reset/
    │   │       └── ddl_drop_tables.sql
    │   └── 03_monitoring-notes/
    │       └── 01_ddl_create_tables.sql
    └── checks/
        ├── dql_check_connection.sql
        └── dql_check_table_data.sql
```

SQL paths in the runners are relative to `sql/` (for example `features/01_countries/01_ddl_create_tables.sql`).
Only SQL files explicitly listed in a runner are executed. For example, the monitoring-notes feature is not currently included in `02_create.sh`.

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

Scripts do not contain `BEGIN` / `COMMIT`. The scripts in `scripts/` execute each script with `psql --single-transaction -v ON_ERROR_STOP=1`: a script is applied entirely or not at all, and the run stops at the first error.

`sql/setup/00_create_database.sql` is the exception: `CREATE DATABASE` cannot run inside a transaction, so `init` runs it without one, connected to the `postgres` database.

## 5. Running Scripts

The examples assume that PostgreSQL is installed, `psql` is in the `PATH`, and the commands run in Bash. On Windows, use Git Bash so the scripts can access the Windows installation of `psql`.

The scripts read connection settings only from the `.env` file at the repository root. Copy `.env.example` to `.env` and set `POSTGRES_PASSWORD`. `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER` and `POSTGRES_DB` default to `localhost`, `5432`, `postgres` and `planet_pulse`, respectively. Terminal environment variables are ignored. If `.env` is missing or `POSTGRES_PASSWORD` is empty, the scripts stop and print an error.

The scenarios operate on the database configured in `.env`. The full restart drops that database, and the other scenarios drop and recreate its tables. Do not run them against a database containing data you need. See [`scripts/scenarios/README.md`](scripts/scenarios/README.md) for scenario details and ordering.

### Run the Steps

| Script                   | Description                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| `00_init.sh`             | Creates the configured database if it does not exist; otherwise skips it  |
| `01_check_connection.sh` | Runs `checks/dql_check_connection.sql`                                      |
| `02_create.sh`           | Creates listed feature tables, in dependency order                         |
| `03_check_tables.sh`     | Reports whether each user table has data                                   |
| `04_insert.sh`           | Runs listed data scripts, in dependency order                              |
| `drop_tables.sh`         | Drops listed feature tables in reverse creation order                      |
| `drop_database.sh`       | Drops the configured database (destructive)                                |
| `test.sh`                | Runs every `scenarios/*.sh` script in filename order                        |

```bash
bash database/scripts/test.sh
```

For a normal build, run the steps in order:

```bash
bash database/scripts/00_init.sh
bash database/scripts/01_check_connection.sh
bash database/scripts/02_create.sh
bash database/scripts/04_insert.sh
bash database/scripts/03_check_tables.sh
```

### Check the Connection

`01_check_connection.sh` runs `checks/dql_check_connection.sql` and fails if the configured database cannot be reached:

```bash
bash database/scripts/01_check_connection.sh
```

### Check Table Contents

`03_check_tables.sh` lists tables outside PostgreSQL's system schemas in the configured database and reports `YES` or `NO` in the `has_data` column. It checks only whether at least one row exists; it does not count or display table contents. It is read-only and can be run independently:

```bash
bash database/scripts/03_check_tables.sh
```

## 6. Adding a Feature

1. Create `sql/features/<NN>_<feature>/` with the next free number.
2. Add `01_ddl_create_tables.sql`, then the `dml` scripts in dependency order.
3. Add `reset/ddl_drop_tables.sql`; add `reset/ddl_truncate_tables.sql` if needed.
4. Add each applicable SQL script path to the arrays in `02_create.sh`, `04_insert.sh` and `drop_tables.sh`. Keep creation and insertion order aligned with feature dependencies, and drop dependent tables first.

The scripts in `scripts/` only execute the SQL files listed in them. There is currently no runner for `ddl_truncate_tables.sql`.

## 7. Available Checks

The scripts in the `sql/checks/` directory are used to:

- Verify database connectivity.
- Check whether each user table contains at least one row.

Validation scripts must not modify the database schema or its data.
