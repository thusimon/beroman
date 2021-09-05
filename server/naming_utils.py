import re

def normalize_country(country):
  country = country.lower()
  if re.match(r'.*area.*', country, re.IGNORECASE|re.DOTALL):
    return 'all other areas'
  elif re.match(r'^ch.*', country, re.IGNORECASE|re.DOTALL):
    return 'china mainland'
  elif re.match(r'^in.*', country, re.IGNORECASE|re.DOTALL):
    return 'india'
  elif re.match(r'^me.*', country, re.IGNORECASE|re.DOTALL):
    return 'mexico'
  elif re.match(r'^ph.*', country, re.IGNORECASE|re.DOTALL):
    return 'philippines'
  elif re.match(r'.*dominican.*', country, re.IGNORECASE|re.DOTALL):
    return 'dominican'
  elif re.match(r'^vietnam.*', country, re.IGNORECASE|re.DOTALL) or re.match(r'^vn.*', country, re.IGNORECASE|re.DOTALL):
    return 'vietnam'
  else:
    return country

def normalize_category(category):
  category = category.lower()
  if re.match(r'.*other.*', category, re.IGNORECASE|re.DOTALL):
    return 'other'
  elif re.match(r'.*(religious|religiuos).*', category, re.IGNORECASE|re.DOTALL):
    return 'religious'
  elif re.match(r'.*schedule.*', category, re.IGNORECASE|re.DOTALL):
    return 'schedule a workers'
  elif re.match(r'.*Iraqi|translator.*', category, re.IGNORECASE|re.DOTALL):
    return category
  elif re.match(r'.*1st.*', category, re.IGNORECASE|re.DOTALL):
    return 'eb-1'
  elif re.match(r'.*2nd.*', category, re.IGNORECASE|re.DOTALL):
    return 'eb-2'
  elif re.match(r'.*3rd.*', category, re.IGNORECASE|re.DOTALL):
    return 'eb-3'
  elif re.match(r'.*4th.*', category, re.IGNORECASE|re.DOTALL):
    return 'eb-4'
  elif re.match(r'^5th$', category, re.IGNORECASE|re.DOTALL):
    return 'eb-5'
  elif re.match(r'^5th pilot.*', category, re.IGNORECASE|re.DOTALL):
    return 'eb-5 pilot'
  elif re.match(r'.*non-regional.*', category, re.IGNORECASE|re.DOTALL):
    return 'eb-5 non-regional(C5 T5)'
  elif re.match(r'.*targeted.*', category, re.IGNORECASE|re.DOTALL) and re.match(r'.*regional.*', category, re.IGNORECASE|re.DOTALL):
    return 'eb-5 TEA regional(T5 R5)'
  elif re.match(r'.*targeted.*', category, re.IGNORECASE|re.DOTALL):
    return 'eb-5 TEA(T5)'
  elif re.match(r'.*regional.*', category, re.IGNORECASE|re.DOTALL):
    return 'eb-5 regional(I5 R5)'
  else:
    return category