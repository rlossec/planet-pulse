-- Check PostgreSQL connexion
SELECT
    current_database() AS database_name,
    current_user AS database_user,
    current_schema() AS current_schema,
    version() AS database_version;

SELECT 1 AS connection_ok;
