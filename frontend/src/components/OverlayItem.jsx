import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import overlayService from "../services/overlayService";

export default function OverlayItem({ overlay, onDelete }) {
  const handleUpdate = async (pos, size) => {
    await overlayService.updateOverlay(overlay.id, {
      ...overlay,
      position: pos,
      size,
    });
  };

  return (
    <Draggable
      defaultPosition={{ x: overlay.position.x, y: overlay.position.y }}
      onStop={(e, data) => handleUpdate({ x: data.x, y: data.y }, overlay.size)}
    >
      <ResizableBox
        width={overlay.size.w}
        height={overlay.size.h}
        minConstraints={[50, 30]}
        onResizeStop={(e, { size }) =>
          handleUpdate(overlay.position, { w: size.width, h: size.height })
        }
        className="bg-white shadow-md border flex items-center justify-center p-2"
      >
        <div className="flex items-center justify-between w-full">
          <span>{overlay.content}</span>
          <button onClick={onDelete} className="ml-2 text-red-600 font-bold">
            ✕
          </button>
        </div>
      </ResizableBox>
    </Draggable>
  );
}
