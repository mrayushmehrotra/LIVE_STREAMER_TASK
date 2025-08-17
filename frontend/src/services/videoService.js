import axios from "axios";

const API = "http://localhost:5000/api/stream";

const startStream = async (rtspUrl) => {
  const res = await axios.post(`${API}/start`, { rtsp_url: rtspUrl });
  return res.data;
};

const getStatus = async () => {
  const res = await axios.get(`${API}/status`);
  return res.data;
};

export default { startStream, getStatus };
