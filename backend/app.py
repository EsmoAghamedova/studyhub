from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp

from config import Config
from database import db

from flask_jwt_extended import JWTManager

from models.user import User
from models.note import Note
from models.attachment import Attachment
from models.session import StudySession

jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    CORS(app)

    jwt.init_app(app)

    app.register_blueprint(
        auth_bp,
        url_prefix="/api/auth"
    )

    @app.route("/")
    def home():
        return {
            "message": "StudyHub API is running"
        }

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
