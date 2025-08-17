from controllers.overlay_controller import (
    create_overlay,
    delete_overlay,
    get_overlay,
    get_overlays,
    update_overlay,
)
from flask import Blueprint, jsonify, request

overlay_bp = Blueprint("overlays", __name__)


@overlay_bp.route("/", methods=["POST"])
def create():
    data = request.get_json()
    overlay_id = create_overlay(data)
    return jsonify({"id": overlay_id}), 201


@overlay_bp.route("/", methods=["GET"])
def get_all():
    overlays = get_overlays()
    return jsonify(overlays), 200


@overlay_bp.route("/<overlay_id>", methods=["GET"])
def get_one(overlay_id):
    overlay = get_overlay(overlay_id)
    if overlay:
        return jsonify(overlay), 200
    return jsonify({"error": "Overlay not found"}), 404


@overlay_bp.route("/<overlay_id>", methods=["PUT"])
def update(overlay_id):
    data = request.get_json()
    success = update_overlay(overlay_id, data)
    if success:
        return jsonify({"message": "Overlay updated"}), 200
    return jsonify({"error": "Overlay not found"}), 404


@overlay_bp.route("/<overlay_id>", methods=["DELETE"])
def delete(overlay_id):
    success = delete_overlay(overlay_id)
    if success:
        return jsonify({"message": "Overlay deleted"}), 200
    return jsonify({"error": "Overlay not found"}), 404
