#!/usr/bin/env bash
# Drops and recreates the test database, its tables and data.
# Usage: database/scripts/scenarios/01_full_restart.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPTS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPTS_DIR/_common.sh"

bash "$SCRIPTS_DIR/drop_database.sh"
bash "$SCRIPTS_DIR/00_init.sh"
bash "$SCRIPTS_DIR/01_check_connection.sh"
bash "$SCRIPTS_DIR/02_create.sh"
bash "$SCRIPTS_DIR/03_check_tables.sh"
bash "$SCRIPTS_DIR/04_insert.sh"
bash "$SCRIPTS_DIR/03_check_tables.sh"
