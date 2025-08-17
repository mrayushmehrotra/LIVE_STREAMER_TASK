# Livestream Overlay App - User Guide

## Overview
This application allows you to stream live video from RTSP sources and add customizable overlays (text and images) on top of the video. Overlays can be positioned, resized, and saved for future use.

## Features
- **RTSP Stream Playback**: Play any RTSP stream with basic controls
- **Custom Overlays**: Add text and image overlays
- **Drag & Resize**: Position and resize overlays interactively
- **Save Settings**: Overlays are automatically saved to MongoDB
- **Real-time Updates**: Changes are reflected immediately

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB
- FFmpeg

### Installation

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

pip install -r requirements.txt

# Start MongoDB (if not running)
mongod

# Start backend server
python app.py
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Using the Application

#### 1. Start a Stream
1. Open http://localhost:5173
2. Enter your RTSP URL in the input field
3. Click "Start Stream"
4. The video will load with basic controls (play, pause, volume)

#### 2. Adding Overlays
1. Once the stream is playing, use the overlay controls at the bottom
2. **For Text Overlays**:
   - Select "Text" from dropdown
   - Enter your text content
   - Click "Add"
3. **For Image Overlays**:
   - Select "Image" from dropdown
   - Enter image URL
   - Click "Add"

#### 3. Managing Overlays
- **Drag**: Click and drag overlays to reposition
- **Resize**: Use the resize handles on overlay corners
- **Delete**: Click the ✕ button on any overlay
- **All changes are auto-saved**

### RTSP URL Examples
```
rtsp://wowzaec2demo.streamlock.net/vod-multitrack/_definst_/mp4:BigBuckBunny_115k.mov
rtsp://freja.hiof.no:1935/rtplive/_definst_/test3.stream
```

### Troubleshooting

#### Common Issues

**"Failed to start stream"**
- Check RTSP URL format (must start with rtsp://)
- Verify the RTSP stream is accessible
- Check FFmpeg is installed: `ffmpeg -version`

**"MongoDB connection failed"**
- Ensure MongoDB is running: `mongod`
- Check connection string in config.py

**"Overlay not saving"**
- Check backend logs for errors
- Verify MongoDB connection
- Check browser console for frontend errors

#### Testing with Demo RTSP
If you don't have an RTSP stream, use these test URLs:
- `rtsp://wowzaec2demo.streamlock.net/vod-multitrack/_definst_/mp4:BigBuckBunny_115k.mov`
- `rtsp://freja.hiof.no:1935/rtplive/_definst_/test3.stream`

### Development Tips

#### Creating Test RTSP Stream
You can create a test RTSP stream using FFmpeg:
```bash
# Create a test RTSP server (requires additional setup)
ffmpeg -re -i input.mp4 -c:v libx264 -f rtsp rtsp://localhost:8554/test
```

#### MongoDB Commands
```bash
# Check database
mongo
use overlays_db
db.overlays.find()

# Clear all overlays
db.overlays.deleteMany({})
```

### API Testing
Use tools like Postman or curl to test API endpoints:
```bash
# Test stream start
curl -X POST http://localhost:5000/api/stream/start \
  -H "Content-Type: application/json" \
  -d '{"rtsp_url":"rtsp://example.com/stream"}'

# Test overlay creation
curl -X POST http://localhost:5000/api/overlays/ \
  -H "Content-Type: application/json" \
  -d '{"type":"text","content":"Hello","position":{"x":50,"y":50},"size":{"w":100,"h":50}}'
