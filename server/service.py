import datetime
from server.db import connect_db
from server.scrap.parse import parse_employ_page

collection_name = 'greencard_work_pd'

class Service(object):
  def __init__(self) -> None:
      self.db = connect_db()
      self.cache = {
        'time': datetime.datetime(year=datetime.MINYEAR, month=1, day=1),
        'val': []
      }
      print('successfully connected to db')

  def add_pd(self, year, month):
    try:
      now = datetime.datetime.now()
      data_from_web = parse_employ_page(year, month)
      month_padded = str(month).rjust(2, '0')
      #always delete test database records
      deleted = self.db['pd_test'].delete_many({})
      print(str(now))
      #print('{} rows deleted from test db'.format(deleted.deleted_count))
      if data_from_web and len(data_from_web) > 0:
        # delete the data of the same notice time in db
        deleted = self.db[collection_name].delete_many({'nt': '{}-{}-01'.format(year, month_padded)})
        #print('{} rows deleted'.format(deleted.deleted_count))
        insertedReal = self.db[collection_name].insert_many(data_from_web).inserted_ids
        #print('updated {} rows for {}-{} successfully in real db'.format(len(insertedReal), year, month))

        # update the test database
        insertedTest = self.db['pd_test'].insert_many(data_from_web).inserted_ids
        #print('updated {} rows for {}-{} successfully in test db'.format(len(insertedTest), year, month))
        print('updated {} for testdb, {} for real db'.format(len(insertedReal), len(insertedTest)))
      else:
        print('no data')
    except Exception as e:
      print(str(e))

  def pd_field(self, row):
    return {'nt': row['nt'], 'cny': row['cny'], 'cat': row['cat'], 'pd': row['pd']}

  def get_all_pd(self):
    # try to get from cache first, the data can be cached for one month
    now = datetime.datetime.now()
    cached_time = self.cache.get('time')
    if now.year == cached_time.year and now.month == cached_time.month:
      print('request at time {}, have cache at time {}, use cache'.format(now, cached_time))
      return self.cache.get('val')
    
    print('request at time {}, have no cache at time {}, get from db'.format(now, cached_time))
    cursor = self.db[collection_name].find({})
    all_pd = list(map(self.pd_field, cursor))
    self.cache['time'] = now
    self.cache['val'] = all_pd
    return all_pd
