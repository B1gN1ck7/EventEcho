"""
Apply the EventEcho.sql schema to the configured Postgres database.

Usage:
  - Configure DB via environment variables (PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT)
  - Or set DATABASE_URL to a full connection string
  - Then run: python apply_schema.py

This script reads `EventEcho.sql` from the workspace root and executes the statements.
It splits statements on semicolons and executes non-empty statements. It prints progress
and errors. Be careful running this against production databases.
"""
import os
import sys
import psycopg2

DB_CONF = {
    "user": os.environ.get("PGUSER", "postgres"),
    "password": os.environ.get("PGPASSWORD", "Reds0404!"),
    "host": os.environ.get("PGHOST", "localhost"),
    "dbname": os.environ.get("PGDATABASE", "EventEcho"),
    "port": os.environ.get("PGPORT", 5432),
}
DATABASE_URL = os.environ.get("DATABASE_URL")

# Prefer values defined in the project's app.py if it's present and exposes DB_CONF or DATABASE_URL.
try:
    import app as project_app
    # If project defines DATABASE_URL, prefer it
    if hasattr(project_app, 'DATABASE_URL') and project_app.DATABASE_URL:
        DATABASE_URL = project_app.DATABASE_URL
    # Else, if project exposes DB_CONF, merge values into DB_CONF
    elif hasattr(project_app, 'DB_CONF') and isinstance(project_app.DB_CONF, dict):
        # copy values from app.DB_CONF into our DB_CONF for connection
        for k, v in project_app.DB_CONF.items():
            # normalize key name for psycopg2 kwargs (dbname vs database)
            if k == 'dbname':
                DB_CONF['dbname'] = v
            else:
                DB_CONF[k] = v
except Exception:
    # If importing app fails, continue using environment/defaults
    project_app = None

SQL_PATH = os.path.join(os.path.dirname(__file__), "EventEcho.sql")

def connect():
    if DATABASE_URL:
        return psycopg2.connect(DATABASE_URL)
    return psycopg2.connect(**DB_CONF)

def load_sql(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def split_statements(sql_text):
    # Simple split on semicolon — this is fine for schema DDL without complex plpgsql blocks.
    parts = [p.strip() for p in sql_text.split(";")]
    return [p for p in parts if p]

def apply_schema():
    if not os.path.exists(SQL_PATH):
        print(f"SQL file not found: {SQL_PATH}")
        sys.exit(2)

    sql_text = load_sql(SQL_PATH)
    statements = split_statements(sql_text)

    print(f"Connecting to database (host={DB_CONF.get('host')}, dbname={DB_CONF.get('dbname')})...")
    try:
        conn = connect()
    except Exception as e:
        print("Failed to connect to DB:", e)
        raise

    try:
        cur = conn.cursor()
        executed = 0
        for stmt in statements:
            try:
                # Execute each statement in its own transaction to isolate failures
                cur.execute(stmt)
                conn.commit()
                executed += 1
            except psycopg2.errors.DuplicateObject as e:
                # Object already exists — warn, rollback this statement and continue
                print("Warning: object already exists, skipping statement:\n", stmt[:200])
                conn.rollback()
            except Exception as e:
                print("Error executing statement:\n", stmt[:200], "\nError:", e)
                conn.rollback()
                # continue or raise? we'll raise to surface unexpected problems
                raise
        print(f"Applied {executed} statements from {SQL_PATH}")
    finally:
        try:
            cur.close()
        except Exception:
            pass
        try:
            conn.close()
        except Exception:
            pass

if __name__ == '__main__':
    apply_schema()
