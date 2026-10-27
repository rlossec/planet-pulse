#!/usr/bin/env bash
# Creates tables.
# Usage: database/scripts/03_create.sh

source "$(dirname "$0")/_common.sh"

# Referenced tables first.
scripts=(
    features/01_countries/01_ddl_create_tables.sql
    features/02_indicators/01_ddl_create_tables.sql
    #features/03_monitoring-notes/01_ddl_create_tables.sql
)

run_sql_files "${scripts[@]}"
