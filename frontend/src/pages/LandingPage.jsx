import React, { useState } from "react";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import OverlayEditor from "../components/OverlayEditor";

const LandingPage = () => {
  const [rtspUrl, setRtspUrl] = useState("");
  const [hlsUrl, setHlsUrl] = useState(null);

  const startStream = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/stream/start", {
        rtsp_url: rtspUrl,
      });
      setHlsUrl(res.data.hls_url);
    } catch (err) {
      alert("Failed to start stream: " + err.message);
    }
  };

  return (
    <div className="p-6 text-center">
      {!hlsUrl ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Enter RTSP URL</h1>
          <input
            type="text"
            value={rtspUrl}
            onChange={(e) => setRtspUrl(e.target.value)}
            placeholder="rtsp://..."
            className="border p-2 w-1/2"
          />
          <button
            onClick={startStream}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Stream
          </button>
        </div>
      ) : (
        <div className="relative">
          <VideoPlayer hlsUrl={hlsUrl} />
          <OverlayEditor />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
