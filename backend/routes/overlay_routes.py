from flask import Blueprint
from controllers.overlay_controller import (
    create_overlay,
    get_overlays,
    update_overlay,
    delete_overlay,
)

overlay_bp = Blueprint("overlays", __name__)

overlay_bp.route("/", methods=["POST"])(create_overlay)
overlay_bp.route("/", methods=["GET"])(get_overlays)
overlay_bp.route("/<overlay_id>", methods=["GET"])(get_overlays)
overlay_bp.route("/<overlay_id>", methods=["PUT"])(update_overlay)
overlay_bp.route("/<overlay_id>", methods=["DELETE"])(delete_overlay)
