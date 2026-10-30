#!/usr/bin/env bash
# Creates the PlanetPulse database if it does not exist yet.
# Usage: database/scripts/00_init.sh

source "$(dirname "$0")/_common.sh"

file=setup/00_create_database.sql

# Connected to the postgres database: planet_pulse may not exist yet.
exists=$(run_psql -d postgres -v db="$POSTGRES_DB" -tA <<< "SELECT 1 FROM pg_database WHERE datname = :'db'")

if [ "$exists" = 1 ]; then
    echo "Database $POSTGRES_DB already exists: skipped"
    exit 0
fi

echo "-> $file"
run_psql -d postgres -q -f "$sql_dir/$file"
