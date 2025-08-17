from flask import jsonify, request
from bson import ObjectId
from db import db   # import db instance

def create_overlay(data):
    overlays = db.overlays
    overlay_id = overlays.insert_one(data).inserted_id
    return str(overlay_id)

def get_overlays():
    overlays = db.overlays.find()
    return [{**overlay, "_id": str(overlay["_id"])} for overlay in overlays]

def get_overlay(overlay_id):
    overlays = db.overlays
    overlay = overlays.find_one({"_id": ObjectId(overlay_id)})
    if overlay:
        overlay["_id"] = str(overlay["_id"])
        return overlay
    return None

def update_overlay(overlay_id, data):
    overlays = db.overlays
    result = overlays.update_one({"_id": ObjectId(overlay_id)}, {"$set": data})
    return result.modified_count > 0

def delete_overlay(overlay_id):
    overlays = db.overlays
    result = overlays.delete_one({"_id": ObjectId(overlay_id)})
    return result.deleted_count > 0
