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
│   ├── 01_check.sh
│   ├── 02_create.sh
│   ├── 03_insert.sh
│   ├── 04_drop.sh
│   ├── build.sh                # init, check, create
│   ├── build_with_data.sh      # init, check, create, insert
│   └── rebuild.sh              # drop, create, insert
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
    │   └── 02_indicators/
    │       ├── 01_ddl_create_tables.sql
    │       ├── 02_dml_insert_annual_indicators.sql
    │       └── reset/
    │           ├── ddl_drop_tables.sql
    │           └── ddl_truncate_tables.sql
    └── checks/
        └── dql_check_connection.sql
```

SQL paths in the runners are relative to `sql/` (for example `features/01_countries/01_ddl_create_tables.sql`).

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

The examples assume that PostgreSQL is installed, `psql` is in the `PATH`, and the commands run in Bash. On Windows, use a Git Bash terminal: from PowerShell, `bash` may start WSL, which cannot see the Windows `psql` (see `runners.md`). The scripts in `scripts/` read the connection only from the `.env` file at the repository root (copy `.env.example`): `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB`. Terminal variables are ignored. `POSTGRES_PASSWORD` is required: if `.env` is missing or the password is empty, the scripts print what to fill in and stop.

### Build the Database

`build_with_data` creates the database if it does not exist, then the tables, then inserts the data. It never drops anything, and fails if the tables already exist. `build` does the same without inserting data.

```bash
bash database/scripts/build_with_data.sh
```

### Run the Steps

| Script            | Scripts executed                                               |
| ----------------- | -------------------------------------------------------------- |
| `00_init.sh`      | `setup/00_create_database.sql`, skipped if the database exists |
| `01_check.sh`     | `checks/dql_check_connection.sql`                              |
| `02_create.sh`    | `ddl_create_tables.sql` of each feature                        |
| `03_insert.sh`    | `dml` scripts, into empty tables                               |
| `04_drop.sh`      | `reset/ddl_drop_tables.sql` of each feature, in reverse order  |
| `build`           | `init`, then `check`, then `create`                            |
| `build_with_data` | `build`, then `insert`                                         |
| `rebuild`         | `drop`, then `create`, then `insert`                           |

```bash
bash database/scripts/rebuild.sh
POSTGRES_DB=planet_pulse bash database/scripts/02_create.sh
```

### Check the Connection

`check` runs `checks/dql_check_connection.sql` with the same connection as the other scripts, and fails if the database cannot be reached:

```bash
bash database/scripts/01_check.sh
```

## 6. Adding a Feature

1. Create `sql/features/<NN>_<feature>/` with the next free number.
2. Add `01_ddl_create_tables.sql`, then the `dml` scripts in dependency order.
3. Add `reset/ddl_drop_tables.sql` and `reset/ddl_truncate_tables.sql`.

4. Add each script path to the lists of `02_create.sh`, `03_insert.sh` and `04_drop.sh` (see `runners.md`).

The scripts in `scripts/` only execute the SQL files listed in them.

## 7. Available Checks

The scripts in the `sql/checks/` directory are used to:

- Verify database connectivity.
- Check that the expected tables exist.
- Detect missing data or potential duplicates.

Validation scripts must not modify the database schema or its data.
