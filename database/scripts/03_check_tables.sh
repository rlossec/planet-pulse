#!/usr/bin/env bash
# Lists user tables and checks whether each table contains at least one row.
# This script only reads database metadata and table contents.
# Usage: database/scripts/03_check_tables.sh

source "$(dirname "$0")/_common.sh"

scripts=(
    checks/dql_check_table_data.sql
)

run_sql_files "${scripts[@]}"
