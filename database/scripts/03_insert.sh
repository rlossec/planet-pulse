#!/usr/bin/env bash
# Inserts data.
# Usage: database/scripts/03_insert.sh

source "$(dirname "$0")/_common.sh"

# Referenced rows first.
scripts=(
    features/01_countries/02_dml_insert_regions.sql
    features/01_countries/03_dml_insert_subregions.sql
    features/01_countries/04_dml_insert_countries.sql
    features/02_indicators/02_dml_insert_annual_indicators.sql
)

run_sql_files "${scripts[@]}"
