from flask import Flask, jsonify
from flask_cors import CORS
from db import db   # import db instance
from routes.overlay_routes import overlay_bp

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "API is running"})

# Register Blueprints
app.register_blueprint(overlay_bp, url_prefix="/api/overlays")

if __name__ == "__main__":
    app.run(debug=True)
