from pymongo import MongoClient
import sys
import os

MONGO_URL="mongodb+srv://node-garden:node-garden@cluster0-tfzjm.mongodb.net/uscis?retryWrites=true&w=majority"

def connect_db():
  try:
    client = MongoClient(MONGO_URL)
    db=client.uscsi
    return db
  except:
    e = sys.exc_info()[0]
    print(e)
    return None
