from constants import uscis_url, uscis_url2, months
from naming_utils import normalize_country, normalize_category
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime
import csv
import json

def get_employment_table(soup):
  tbodies = soup.find_all('tbody')
  for tbody in tbodies:
    if re.match(r'.*Employment.*Based.*', tbody.text, re.IGNORECASE|re.DOTALL) is not None:
      return tbody
  return None

def only_string(text):
  text = text.strip()
  return text.replace(u'\xa0', u'').replace(u'\n', u'')

def parse_date(date_str):
  strip_str = date_str.strip()
  if re.match(r'\d+ \S+ \d+', strip_str):
    return datetime.strptime(strip_str, '%d %m %Y').strftime('%Y-%m-%d')
  elif re.match(r'\d+\S+\d+', strip_str):
    return datetime.strptime(strip_str, '%d%b%y').strftime('%Y-%m-%d')
  elif strip_str.upper() == 'C':
    return 'C'
  elif strip_str.upper() == 'U':
    return 'U'
  else:
    return strip_str.upper()

def parse_employ_table(table, year, month):
  if table is None:
    print('{}-{} no table found, exit!!!'.format(month, year))
    return None
  data = []
  trs = table.find_all('tr')
  header_start = 0
  while len(trs[header_start].find_all(['th', 'td'])) <=2:
    header_start += 1
  header = trs[header_start]
  countries = [ normalize_country(only_string(c.text)) for c in header.find_all(['th', 'td'])[1:] ]
  body = trs[header_start + 1:]
  for tr in body:
    tds = tr.find_all(['th', 'td'])
    if re.match(r'.*Employment.*Based.*', tds[0].text, re.IGNORECASE|re.DOTALL) is not None:
      continue
    catetory = normalize_category(only_string(tds[0].text))
    if not catetory:
      continue
    pds = [ parse_date(only_string(pd.text)) for pd in tds[1:] ]
    # store the data
    # Notice Time	| Country	| Category | Priority Date
    for idx, pd in enumerate(pds):
      data_row = {
        'nt': parse_date('01 {} {}'.format(month, year)),
        'cny': countries[idx],
        'cat': catetory,
        'pd': pd
      }
      data.append(data_row)
  return data

def build_url(url, year, month):
  fiscal_year = year
  if month >= 10:
    fiscal_year += 1
  month_str = months[month-1]
  return url.format(fiscal_year=fiscal_year, month=month_str, year=year)

def try_get_employment_table(url, year, month):
  #month = 1-12
  url = build_url(url, year, month)
  try:
    page = requests.get(url)
  except:
    print('error when getting {}'.format(url))
    return None
  soup = BeautifulSoup(page.content, 'html.parser')
  return get_employment_table(soup)

def parse_page(year, month):
  employment_table = try_get_employment_table(uscis_url, year, month)
  if employment_table is None:
    employment_table = try_get_employment_table(uscis_url2, year, month)

  return parse_employ_table(employment_table, year, month)
  
def save_data(data):
  with open('pd.csv', 'a') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',', quoting=csv.QUOTE_MINIMAL)
    spamwriter.writerows(data)

def save_data_json(data):
  with open('pd.json', 'w') as jsonfile:
    json.dump(data, jsonfile, indent=2)
