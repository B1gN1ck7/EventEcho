from database import create_connection

conn = create_connection()

if conn:
    cur = conn.cursor()
    cur.execute("SELECT NOW();")
    print("Current time from database:", cur.fetchone())
    cur.close()
    conn.close()
