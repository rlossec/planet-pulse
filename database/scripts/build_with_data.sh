#!/usr/bin/env bash
# Creates the PlanetPulse database if needed, then its tables, then fills them.
# Usage: database/scripts/build_with_data.sh

set -euo pipefail

dir="$(dirname "$0")"

bash "$dir/build.sh"
bash "$dir/03_insert.sh"
