# Livestream Overlay API Documentation

## Base URL
`http://localhost:5000`

## Endpoints

### Stream Management

#### Start Stream
- **URL**: `/api/stream/start`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "rtsp_url": "rtsp://example.com/stream"
  }
  ```
- **Response**:
  ```json
  {
    "hls_url": "/streams/livestream/index.m3u8"
  }
  ```

#### Stream Status
- **URL**: `/api/stream/status`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "running",
    "active_streams": {
      "livestream": "running"
    }
  }
  ```

### Overlay Management

#### Create Overlay
- **URL**: `/api/overlays/`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "type": "text",
    "content": "Hello World",
    "position": {"x": 50, "y": 50},
    "size": {"w": 150, "h": 80}
  }
  ```
- **Response**:
  ```json
  {
    "id": "507f1f77bcf86cd799439011"
  }
  ```

#### Get All Overlays
- **URL**: `/api/overlays/`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "_id": "507f1f77bcf86cd799439011",
      "type": "text",
      "content": "Hello World",
      "position": {"x": 50, "y": 50},
      "size": {"w": 150, "h": 80}
    }
  ]
  ```

#### Get Single Overlay
- **URL**: `/api/overlays/<overlay_id>`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "_id": "507f1f77bcf86cd799439011",
    "type": "text",
    "content": "Hello World",
    "position": {"x": 50, "y": 50},
    "size": {"w": 150, "h": 80}
  }
  ```

#### Update Overlay
- **URL**: `/api/overlays/<overlay_id>`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "content": "Updated text",
    "position": {"x": 100, "y": 100}
  }
  ```
- **Response**:
  ```json
  {
    "message": "Overlay updated"
  }
  ```

#### Delete Overlay
- **URL**: `/api/overlays/<overlay_id>`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "message": "Overlay deleted"
  }
  ```

## Error Responses
All endpoints return appropriate HTTP status codes:
- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error
