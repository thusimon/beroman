from server.config.constants import months

def build_url(url, year, month):
  fiscal_year = year
  if month >= 10:
    fiscal_year += 1
  month_str = months[month-1]
  return url.format(fiscal_year=fiscal_year, month=month_str, year=year)