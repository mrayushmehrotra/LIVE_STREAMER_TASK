import os


class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://ayushmehrotraisthedev:ayushmehrotraisthedev@cluster0.luggmsv.mongodb.net/rtsp")
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
    STREAM_FOLDER = os.path.join(os.getcwd(), "streams")

    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    if not os.path.exists(STREAM_FOLDER):
        os.makedirs(STREAM_FOLDER)
