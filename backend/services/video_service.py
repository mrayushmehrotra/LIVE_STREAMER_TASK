import os
import subprocess
from config import Config

# Track running streams
active_streams = {}

def start_rtsp_to_hls(rtsp_url: str, stream_name="livestream"):
    """
    Convert RTSP stream into HLS (m3u8) format using ffmpeg.
    Returns relative HLS URL to serve in frontend.
    """
    output_path = os.path.join(Config.STREAM_FOLDER, stream_name)
    os.makedirs(output_path, exist_ok=True)

    command = [
        "ffmpeg",
        "-i", rtsp_url,
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-tune", "zerolatency",
        "-c:a", "aac",
        "-f", "hls",
        "-hls_time", "2",
        "-hls_list_size", "3",
        "-hls_flags", "delete_segments",
        os.path.join(output_path, "index.m3u8"),
    ]

    # Kill any existing stream for this name
    if stream_name in active_streams:
        try:
            active_streams[stream_name].kill()
        except Exception:
            pass

    process = subprocess.Popen(command, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    active_streams[stream_name] = process

    return f"/streams/{stream_name}/index.m3u8"

def get_stream_status():
    status = {}
    for name, proc in active_streams.items():
        status[name] = "running" if proc.poll() is None else "stopped"
    return {"status": "running" if status else "stopped", "active_streams": status}
