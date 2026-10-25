#!/usr/bin/env bash
# Creates the PlanetPulse database if needed, then its tables, then fills them.
# Usage: database/scripts/build_with_data.sh

set -euo pipefail

dir="$(dirname "$0")"

bash "$dir/build.sh"
bash "$dir/04_insert.sh"
bash "$dir/02_check_tables.sh"
