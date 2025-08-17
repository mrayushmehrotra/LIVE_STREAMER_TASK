import { useLocation } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import OverlayEditor from "../components/OverlayEditor";
import React from "react";


export default function VideoPlayerPage() {
  const location = useLocation();
  const hlsUrl = location.state?.hlsUrl;

  if (!hlsUrl) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">No stream selected</h2>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <VideoPlayer hlsUrl={hlsUrl} />
      <OverlayEditor />
    </div>
  );
}
