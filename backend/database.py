# database.py

import psycopg2

def create_connection():
    try:
        connection = psycopg2.connect(
            host="localhost",
            database="EventEcho",   # change this to your database name
            user="postgres",            # change if needed
            password="Reds0404!",   # your PostgreSQL password
            port="5432"
        )
        print("✅ Connected to PostgreSQL database successfully!")
        return connection
    except Exception as error:
        print("❌ Error connecting to database:", error)
        return None
