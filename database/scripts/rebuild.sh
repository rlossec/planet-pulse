#!/usr/bin/env bash
# Drops, creates, then fills the PlanetPulse tables.
# Usage: database/scripts/rebuild.sh

set -euo pipefail

dir="$(dirname "$0")"

bash "$dir/05_drop.sh"
bash "$dir/03_create.sh"
bash "$dir/04_insert.sh"
bash "$dir/02_check_tables.sh"
