#!/usr/bin/env bash
# Drop the database
# Usage: database/scripts/drop_database.sh

set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

source "$SCRIPT_DIR/_common.sh"

# Connect to the maintenance database
MAINTENANCE_DB="postgres"

echo "Dropping database: $POSTGRES_DB"

run_psql \
    --no-psqlrc \
    --dbname="$MAINTENANCE_DB" \
    --set=db_name="$POSTGRES_DB" \
    <<< 'DROP DATABASE IF EXISTS :"db_name" WITH (FORCE);'

echo "Database dropped successfully."