import axios from "axios";

const API = "http://localhost:5000/api/overlays";

const getOverlays = async () => {
  const res = await axios.get(API + "/");
  return res.data;
};

const createOverlay = async (overlay) => {
  const res = await axios.post(API + "/", overlay);
  return res.data;
};

const updateOverlay = async (id, overlay) => {
  const res = await axios.put(`${API}/${id}`, overlay);
  return res.data;
};

const deleteOverlay = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

export default { getOverlays, createOverlay, updateOverlay, deleteOverlay };
