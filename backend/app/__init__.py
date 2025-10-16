from flask import Flask
from config import Config
from .extensions import db, migrate
from .routes import register_blueprints

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    register_blueprints(app)

    @app.get("/health")
    def health():
        return {"status": "ok"}, 200

    return app
