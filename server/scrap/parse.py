from server.config.constants import uscis_url, uscis_url2
from server.utils.naming import normalize_country, normalize_category
from server.utils.strings import only_string, parse_date
from server.scrap.get_interested import try_get_employment_table
import re

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

def parse_employ_page(year, month):
  employment_table = try_get_employment_table(uscis_url, year, month)
  if employment_table is None:
    employment_table = try_get_employment_table(uscis_url2, year, month)

  return parse_employ_table(employment_table, year, month)
