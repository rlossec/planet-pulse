#!/usr/bin/env bash
# Drops, creates, then fills the PlanetPulse tables.
# Usage: database/scripts/rebuild.sh

set -euo pipefail

dir="$(dirname "$0")"

bash "$dir/04_drop.sh"
bash "$dir/02_create.sh"
bash "$dir/03_insert.sh"
