from pymongo import MongoClient
import sys
import os

def connect_db():
  try:
    client = MongoClient(os.environ.get('MONGO_URL'))
    db=client.uscsi
    return db
  except:
    e = sys.exc_info()[0]
    print(e)
    return None
