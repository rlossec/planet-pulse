#!/usr/bin/env bash
# Inserts data.
# Usage: database/scripts/04_insert.sh

source "$(dirname "$0")/_common.sh"

# Regions, subregions and countries come from POST /import-data.
# The annual-indicator seed references FR, DE, ES, JP and MA, so it stays
# out of this script until those countries exist.
scripts=(
    # features/01_countries/02_dml_insert_regions.sql
    # features/01_countries/03_dml_insert_subregions.sql
    # features/01_countries/04_dml_insert_countries.sql
    features/02_indicators/02_dml_insert_annual_indicators.sql
)

run_sql_files "${scripts[@]}"
