# **Study Sessions**
# - id
# - user_id(FK → Users.id)
# - subject
# - started_at
# - ended_at
# - duration_minutes
# - status
# - created_at

from datetime import datetime
from database import db

class StudySession(db.Model):
    __tablename__ = "study_sessions"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    subject = db.Column(
        db.String(100),
        nullable=True
    )

    started_at = db.Column(
        db.DateTime,
        nullable=True
    )

    ended_at = db.Column(
        db.DateTime,
        nullable=True
    )

    duration_minutes = db.Column(
        db.Integer,
        nullable=False
    )

    status = db.Column(
        db.String(20),
        default="active"
    )

    points = db.Column(
        db.Integer,
        default=0
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )
