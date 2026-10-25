#!/usr/bin/env bash
# Checks that the database connection is valid.
# Usage: database/scripts/01_check.sh

source "$(dirname "$0")/_common.sh"

scripts=(
    checks/dql_check_connection.sql
)

run_sql_files "${scripts[@]}"

echo "Connection OK: $POSTGRES_USER@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"
