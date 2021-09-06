from server.service import Service
from datetime import date

today = date.today()

service = Service()

service.add_pd(today.year, today.month)
