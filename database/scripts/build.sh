#!/usr/bin/env bash
# Creates the PlanetPulse database if needed, checks the connection, then creates its empty tables.
# Usage: database/scripts/build.sh

set -euo pipefail

dir="$(dirname "$0")"

bash "$dir/00_init.sh"
bash "$dir/01_check_connection.sh"
bash "$dir/03_create.sh"
