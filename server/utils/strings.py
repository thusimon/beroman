import re
from datetime import datetime

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