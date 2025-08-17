import json
from app import app, mongo

def test_create_overlay():
    client = app.test_client()

    payload = {
        "type": "text",
        "content": "Sample Overlay",
        "position": {"x": 100, "y": 150},
        "size": {"w": 200, "h": 50}
    }

    response = client.post("/api/overlays/", json=payload)
    assert response.status_code == 201
    data = json.loads(response.data)
    assert "id" in data
    assert data["content"] == "Sample Overlay"


def test_get_overlays():
    client = app.test_client()
    response = client.get("/api/overlays/")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
