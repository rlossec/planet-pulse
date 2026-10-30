
#!/usr/bin/env bash
# Runs every scenario script in filename order.
# Usage: database/scripts/test.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/_common.sh"

SCENARIOS=("$SCRIPT_DIR"/scenarios/*.sh)

if [ ! -e "${SCENARIOS[0]}" ]; then
    echo "ERROR: No scenario scripts found in $SCRIPT_DIR/scenarios." >&2
    exit 1
fi

for scenario in "${SCENARIOS[@]}"; do
    echo
    echo "========================================"
    echo "SCENARIO: $(basename "$scenario")"
    echo "========================================"
    bash "$scenario"
done