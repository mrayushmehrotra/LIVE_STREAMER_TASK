import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LandingPage = () => {
  const [rtspUrl, setRtspUrl] = useState("rtsp://807e9439d5ca.entrypoint.cloud.wowza.com:1935/app-rC94792j/068b9c9a_stream2")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const startStream = async () => {
    if (!rtspUrl.trim()) {
      setError("Please enter a valid RTSP URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/stream/start", {
        rtsp_url: rtspUrl,
      });
      console.log("Stream started:", res.data);
      
      // Navigate to video player with the HLS URL
      navigate("/player", { state: { hlsUrl: res.data.hls_url } });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to start stream");
      console.error("Stream start error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Live Stream Player
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Start RTSP Stream</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RTSP URL
              </label>
              <input
                type="text"
                value={rtspUrl}
                onChange={(e) => setRtspUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="rtsp://your-stream-url"
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            
            <button
              onClick={startStream}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Starting Stream..." : "Start Stream"}
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold mb-2">Current RTSP URL:</h3>
            <p className="text-sm text-gray-600 break-all">{rtspUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
