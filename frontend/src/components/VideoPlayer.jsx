import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ hlsUrl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported() && video) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.fatal) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("A network error occurred.");
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("A media error occurred.");
              break;
            case Hls.ErrorTypes.OTHER_ERROR:
              console.error("An unknown error occurred.");
              break;
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
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
