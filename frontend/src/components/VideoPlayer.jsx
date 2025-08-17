import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ hlsUrl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = hlsUrl;
    }
  }, [hlsUrl]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        controls
        className="w-[800px] h-[450px] bg-black rounded"
      />
    </div>
  );
}
