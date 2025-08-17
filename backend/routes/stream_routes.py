from flask import Blueprint
from controllers.stream_controller import start_stream, stream_status

stream_bp = Blueprint("stream", __name__)

stream_bp.route("/start", methods=["POST"])(start_stream)
stream_bp.route("/status", methods=["GET"])(stream_status)
