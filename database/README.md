# Database scripts

Scripts for the `planet_pulse` database.

One directory by group of feature :

- `countries`
- `indicators`
- `monitoring-notes`

The `local` directory for the local development.

## Local

1. Script to Initialize schemas and roles
```bash
psql -U postgres -f "database\local\init_database.sql"
```

2. create_tables.sql
```bash
psql -U postgres -d planet_pulse -f "database\ddl\create_tables.sql"
```



## Countries

| Script                   | Role                                          |
| ------------------------ | --------------------------------------------- |
| `raw_mld.sql`            | MLD brut: natural keys                        |
| `create_tables.sql`      | Adapted schema: one artificial id per table   |
| `drop_tables.sql`        | Drop `t_countries`, `t_subregions`, `t_regions` |
| `truncate.sql`           | Empty the same tables                         |

The adaptation is described in [docs/mld/features/countries](../docs/mld/features/countries/README.md).


