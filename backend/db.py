from pymongo import MongoClient

mongo_client = MongoClient("mongodb+srv://ayushmehrotraisthedev:ayushmehrotraisthedev@cluster0.luggmsv.mongodb.net/rtsp")
db = mongo_client.overlays_db
