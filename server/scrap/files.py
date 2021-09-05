import csv
import json

def save_data(data):
  with open('pd.csv', 'a') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',', quoting=csv.QUOTE_MINIMAL)
    spamwriter.writerows(data)

def save_data_json(data):
  with open('pd.json', 'w') as jsonfile:
    json.dump(data, jsonfile, indent=2)