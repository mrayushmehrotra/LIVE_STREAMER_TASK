import React, { useEffect, useState } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const API_URL = "http://127.0.0.1:5000/api/overlays/";

const OverlayEditor = () => {
  const [overlays, setOverlays] = useState([]);
  const [type, setType] = useState("text");
  const [content, setContent] = useState("");

  const fetchOverlays = async () => {
    const res = await axios.get(API_URL);
    setOverlays(res.data);
  };

  useEffect(() => {
    fetchOverlays();
  }, []);

  const addOverlay = async () => {
    if (!content) return;
    const newOverlay = {
      type,
      content,
      position: { x: 50, y: 50 },
      size: { w: 150, h: 80 },
    };
    const res = await axios.post(API_URL, newOverlay);
    setOverlays([...overlays, { ...newOverlay, _id: res.data.id }]);
    setContent("");
  };

  const updateOverlay = async (id, updated) => {
    await axios.put(API_URL + id, updated);
    setOverlays(overlays.map((o) => (o._id === id ? { ...o, ...updated } : o)));
  };

  const deleteOverlay = async (id) => {
    await axios.delete(API_URL + id);
    setOverlays(overlays.filter((o) => o._id !== id));
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {overlays.map((o) => (
        <Draggable
          key={o._id}
          defaultPosition={o.position}
          onStop={(_, data) =>
            updateOverlay(o._id, { position: { x: data.x, y: data.y } })
          }
        >
          <ResizableBox
            width={o.size.w}
            height={o.size.h}
            onResizeStop={(_, { size }) =>
              updateOverlay(o._id, { size: { w: size.width, h: size.height } })
            }
          >
            <div className="bg-white bg-opacity-70 p-1 relative border rounded">
              {o.type === "text" ? (
                <span className="text-black">{o.content}</span>
              ) : (
                <img
                  src={o.content}
                  alt="overlay-logo"
                  className="w-full h-full object-contain"
                />
              )}
              <button
                onClick={() => deleteOverlay(o._id)}
                className="absolute top-0 right-0 bg-red-500 text-white px-1"
              >
                ✕
              </button>
            </div>
          </ResizableBox>
        </Draggable>
      ))}

      {/* Controls to add overlays */}
      <div className="absolute bottom-2 left-2 bg-gray-800 text-white p-2 rounded">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mr-2 p-1 text-black"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={type === "text" ? "Enter text" : "Enter image URL"}
          className="p-1 text-black"
        />
        <button
          onClick={addOverlay}
          className="ml-2 px-2 py-1 bg-green-500 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default OverlayEditor;
