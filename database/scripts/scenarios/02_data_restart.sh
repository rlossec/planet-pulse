#!/usr/bin/env bash
# Recreates the test tables and repopulates their data.
# Usage: database/scripts/scenarios/02_data_restart.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPTS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPTS_DIR/_common.sh"

bash "$SCRIPTS_DIR/drop_tables.sh"
bash "$SCRIPTS_DIR/02_create.sh"
bash "$SCRIPTS_DIR/03_check_tables.sh"
bash "$SCRIPTS_DIR/04_insert.sh"
bash "$SCRIPTS_DIR/03_check_tables.sh"
