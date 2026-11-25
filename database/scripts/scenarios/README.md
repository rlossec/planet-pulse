# Database Scenarios

`database/scripts/test.sh` runs every `*.sh` file in this directory, in filename order. Number scenario files with a two-digit prefix to make the execution order explicit. The full restart runs first because it creates a fresh database for the scenarios that follow.

| Scenario | What it does |
| --- | --- |
| `01_full_restart.sh` | Drops the configured database, recreates it, checks the connection, creates the tables, checks the empty tables, runs `04_insert.sh`, and checks the tables again. |
| `02_data_restart.sh` | Drops and recreates the feature tables, checks the empty tables, runs `04_insert.sh`, and checks the tables again. |
| `03_tables_restart.sh` | Checks the connection, drops and recreates the feature tables, checks the empty tables, runs `04_insert.sh`, and checks the tables again. |

`04_insert.sh` does not load regions, subregions or countries. Those rows come from `POST /import-data`. It does not load annual indicators either: that seed references country codes which are not in the database until the import has run.

## Important

The scenarios use the database configured by `POSTGRES_DB` in the repository-root `.env` file. `01_full_restart.sh` drops that entire database, and the other scenarios drop and recreate its feature tables. Do not run these scenarios against a database containing data you need.

Add new scenarios as numbered `.sh` files in this directory. `test.sh` discovers them automatically; no runner changes are needed.
