"""
Inspect the connected Postgres database and report whether EventEcho schema objects exist.
Usage: python inspect_db.py
It will use DATABASE_URL or DB_CONF from app.py if available, otherwise env vars/defaults.
"""
import os
import importlib
import psycopg2

# Try to reuse app.py DB settings
DB_CONF = {
    "user": os.environ.get("PGUSER", "postgres"),
    "password": os.environ.get("PGPASSWORD", "Reds0404!"),
    "host": os.environ.get("PGHOST", "localhost"),
    "dbname": os.environ.get("PGDATABASE", "EventEcho"),
    "port": os.environ.get("PGPORT", 5432),
}
DATABASE_URL = os.environ.get("DATABASE_URL")
try:
    project_app = importlib.import_module('app')
    if getattr(project_app, 'DATABASE_URL', None):
        DATABASE_URL = project_app.DATABASE_URL
    elif getattr(project_app, 'DB_CONF', None):
        for k, v in project_app.DB_CONF.items():
            if k == 'dbname':
                DB_CONF['dbname'] = v
            else:
                DB_CONF[k] = v
except Exception:
    project_app = None


def connect():
    if DATABASE_URL:
        return psycopg2.connect(DATABASE_URL)
    return psycopg2.connect(**DB_CONF)


def list_public_tables(conn):
    cur = conn.cursor()
    cur.execute("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';")
    rows = cur.fetchall()
    cur.close()
    return [r[0] for r in rows]


def count_table(conn, table):
    cur = conn.cursor()
    try:
        cur.execute(f"SELECT count(*) FROM {table};")
        c = cur.fetchone()[0]
    except Exception as e:
        c = None
    cur.close()
    return c


if __name__ == '__main__':
    print('Connecting...')
    try:
        conn = connect()
    except Exception as e:
        print('Connection failed:', e)
        raise

    try:
        tables = list_public_tables(conn)
        print('Public tables:', tables)
        for t in ['events', 'users']:
            c = count_table(conn, t)
            print(t, 'count =', c)
    finally:
        conn.close()
