import re
import requests
from bs4 import BeautifulSoup
from server.utils.urls import build_url

def get_employment_table(soup):
  tbodies = soup.find_all('tbody')
  for tbody in tbodies:
    if re.match(r'.*Employment.*Based.*', tbody.text, re.IGNORECASE|re.DOTALL) is not None:
      return tbody
  return None

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