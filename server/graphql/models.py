from mongoengine import Document
from mongoengine.fields import (
  StringField,
)

class PriorityDateModel(Document):
  meta = {'collection': 'pd_test'}
  nt = StringField()
  cny = StringField()
  cat = StringField()
  pd = StringField()
