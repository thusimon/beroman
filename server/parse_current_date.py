from service import Service
from datetime import date

today = date.today()

service = Service()

service.add_pd_data(today.year, today.month)
