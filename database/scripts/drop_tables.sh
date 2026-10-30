#!/usr/bin/env bash
# Drops tables.
# Usage: database/scripts/drop_tables.sh

source "$(dirname "$0")/_common.sh"

# Reverse order of creation: referencing tables first.
scripts=(
    features/02_indicators/reset/ddl_drop_tables.sql
    features/01_countries/reset/ddl_drop_tables.sql
)

run_sql_files "${scripts[@]}"
