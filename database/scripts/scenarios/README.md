# Database Scenarios

`database/scripts/test.sh` runs every `*.sh` file in this directory, in filename order. Number scenario files with a two-digit prefix to make the execution order explicit. The full restart runs first because it creates a fresh database for the scenarios that follow.

| Scenario | What it does |
| --- | --- |
| `01_full_restart.sh` | Drops the configured database, recreates it, checks the connection, creates the tables, checks the empty tables, inserts reference data, and checks the populated tables. |
| `02_data_restart.sh` | Drops and recreates the feature tables, checks the empty tables, inserts reference data, and checks the populated tables. |
| `03_tables_restart.sh` | Checks the connection, drops and recreates the feature tables, checks the empty tables, inserts reference data, and checks the populated tables. |

## Important

The scenarios use the database configured by `POSTGRES_DB` in the repository-root `.env` file. `01_full_restart.sh` drops that entire database, and the other scenarios drop and recreate its feature tables. Do not run these scenarios against a database containing data you need.

Add new scenarios as numbered `.sh` files in this directory. `test.sh` discovers them automatically; no runner changes are needed.
