# **Attachments**
# - id
# - original_filename
# - stored_filename
# - file_path
# - uploaded_at
# - note_id(FK → Notes.id)

from datetime import datetime
from database import db

class Attachment(db.Model):
    __tablename__ = "attachments"

    id = db.Column(db.Integer, primary_key=True)

    original_filename = db.Column(
        db.String(120),
        nullable=False
    )

    stored_filename = db.Column(
        db.String(120),
        nullable=False,
        unique=True
    )
    
    file_path = db.Column(
        db.String(500),
        nullable=False
    )
    
    uploaded_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )
    
    note_id = db.Column(
        db.Integer,
        db.ForeignKey("notes.id"),
        nullable=False
    )

