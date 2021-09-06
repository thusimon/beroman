from pymongo import MongoClient
from dotenv import load_dotenv
import sys
import os

load_dotenv()

def connect_db():
  try:
    client = MongoClient(os.environ.get('MONGO_URL'))
    db = client.uscsi
    return db
  except:
    e = sys.exc_info()[0]
    print(e)
    return None
