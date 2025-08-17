# Livestream Overlay App

## Features
- Input **RTSP URL** → live video is embedded directly on landing page.
- Video playback with **play/pause/volume controls**.
- Add **text or image (logo) overlays**.
- Drag, resize, delete overlays.
- Overlays saved to MongoDB via Flask CRUD API.

---

## Tech Stack
- **Backend:** Flask, MongoDB, FFmpeg
- **Frontend:** React, TailwindCSS, HLS.js, react-draggable, react-resizable

---

## Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # (Linux/Mac)
venv\Scripts\activate      # (Windows)
pip install -r requirements.txt
flask run
