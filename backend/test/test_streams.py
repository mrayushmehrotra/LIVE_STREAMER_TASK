import json
from app import app

def test_start_stream_missing_url():
    client = app.test_client()
    response = client.post("/api/stream/start", json={})
    assert response.status_code == 400

def test_stream_status():
    client = app.test_client()
    response = client.get("/api/stream/status")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "status" in data
