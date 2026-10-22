# Sourced by the step scripts (00_init.sh to 04_drop.sh), which live in the same folder.
#
# Connection: 
# - read only from the .env file at the repository root.
# - POSTGRES_PASSWORD is required

set -e

# Directories variables are relative to the scripts folder.
scripts_dir=$(dirname "$0")
sql_dir="$scripts_dir/../sql"
env_file="$scripts_dir/../../.env"

if [ ! -f "$env_file" ]; then
    echo "ERROR: .env not found at the repository root. Copy .env.example to .env and set POSTGRES_PASSWORD."
    exit 1
fi

# Prints the value of the variable $1 in .env, or $2 if it is missing or empty.
read_env() {
    value=$(grep "^$1=" "$env_file" | cut -d '=' -f 2- | tr -d '\r')
    if [ -z "$value" ]; then
        value="$2"
    fi
    echo "$value"
}

POSTGRES_HOST=$(read_env POSTGRES_HOST localhost)
POSTGRES_PORT=$(read_env POSTGRES_PORT 5432)
POSTGRES_USER=$(read_env POSTGRES_USER postgres)
POSTGRES_DB=$(read_env POSTGRES_DB planet_pulse)
POSTGRES_PASSWORD=$(read_env POSTGRES_PASSWORD)

if [ -z "$POSTGRES_PASSWORD" ]; then
    echo "ERROR: POSTGRES_PASSWORD is empty. Set it in .env at the repository root (see .env.example)."
    exit 1
fi

# psql has no password option: it reads the PGPASSWORD environment variable.
export PGPASSWORD="$POSTGRES_PASSWORD"

run_psql() {
    psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -v ON_ERROR_STOP=1 "$@"
}

run_sql_files() {
    for file in "$@"; do
        echo "-> $file"
        run_psql -d "$POSTGRES_DB" --single-transaction -q -f "$sql_dir/$file"
    done
}
