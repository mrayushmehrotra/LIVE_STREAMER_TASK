from flask import request, jsonify
from services.video_service import start_rtsp_to_hls, get_stream_status

def start_stream():
    """
    POST /api/stream/start
    Body: { "rtsp_url": "rtsp://example.com/stream" }
    Response: { "hls_url": "/streams/livestream/index.m3u8" }
    """
    data = request.get_json()
    if "rtsp_url" not in data:
        return jsonify({"error": "Missing RTSP URL"}), 400

    hls_url = start_rtsp_to_hls(data["rtsp_url"])
    return jsonify({"hls_url": hls_url}), 200

def stream_status():
    """
    GET /api/stream/status
    Response: { "status": "running/stopped", "active_streams": [list] }
    """
    return jsonify(get_stream_status()), 200
