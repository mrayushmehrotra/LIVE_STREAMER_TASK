from flask_pymongo import ObjectId

def serialize_overlay(overlay) -> dict:
    return {
        "id": str(overlay["_id"]),
        "type": overlay.get("type"),
        "content": overlay.get("content"),
        "position": overlay.get("position"),
        "size": overlay.get("size")
    }
