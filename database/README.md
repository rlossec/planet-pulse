# Database scripts

Scripts for the `planet_pulse` database and the countries tables.

## Create the database and the tables

```bash
psql -d postgres -f database/01_create_database.sql
psql -d planet_pulse -f database/02_create_tables.sql
```

## Empty the tables

```bash
psql -d planet_pulse -f database/03_truncate.sql
```

## Drop the tables

```bash
psql -d planet_pulse -f database/04_drop_tables.sql
```
