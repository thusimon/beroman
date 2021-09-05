from scrap import parse_page
from db import connect_db

collection_name = 'greencard_work_pd'

class Service(object):
  def __init__(self) -> None:
      self.db = connect_db()

  def add_pd_data(self, year, month):
    data_from_web = parse_page(year, month)
    month_padded = str(month).rjust(2, '0')
    if data_from_web and len(data_from_web) > 0:
      # delete the data of the same notice time in db
      deleted = self.db[collection_name].delete_many({'nt': '{}-{}-01'.format(year, month_padded)})
      print('{} rows deleted'.format(deleted.deleted_count))
      inserted = self.db[collection_name].insert_many(data_from_web).inserted_ids
      print('updated {} rows for {}-{} successfully in real db'.format(len(inserted), year, month))

      # update the test database
      deleted = self.db['pd_test'].delete_many({})
      print('{} rows deleted'.format(deleted.deleted_count))
      inserted = self.db['pd_test'].insert_many(data_from_web).inserted_ids
      print('updated {} rows for {}-{} successfully in test db'.format(len(inserted), year, month))
    else:
      print('no data for {}-{}'.format(year, month))