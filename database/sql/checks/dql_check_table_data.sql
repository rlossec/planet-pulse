-- List every table outside PostgreSQL's system schemas and check whether it
-- contains at least one row. EXISTS stops at the first matching row, so this
-- check does not count or return table contents.
--
-- Output:
--   table_name | has_data
--   schema.table | YES/NO
--
-- Store the generated query without printing it, then execute it with psql.
SELECT COALESCE(
    --string_agg() will return NULL if there are no tables, so we use COALESCE to provide a default query that returns a single row with a message.
    string_agg(
        -- format will construct a query for each table, list them and check if it has data
        -- Since we are at the database/sql level, we need to use %I for identifiers and %L for literals, to check the tables, and to avoid SQL injection.
        format(
            'SELECT %L AS table_name, CASE WHEN EXISTS (SELECT 1 FROM %I.%I LIMIT 1) THEN %L ELSE %L END AS has_data',
            schemaname || '.' || tablename,
            schemaname,
            tablename,
            'YES',
            'NO'
        ),
        ' UNION ALL '
        ORDER BY schemaname, tablename
    ),
    'SELECT ''No user tables found'' AS table_name, NULL::boolean AS has_data'
) AS table_checks
FROM pg_tables
WHERE schemaname <> 'information_schema'
  AND schemaname !~ '^pg_'
\gset
:table_checks;
