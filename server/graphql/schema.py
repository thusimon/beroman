import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType
from server.graphql.models import PriorityDateModel

class PriorityDate(MongoengineObjectType):
  class Meta:
    description = 'PriorityDate'
    model = PriorityDateModel

class Query(graphene.ObjectType):
  node = Node.Field()
  all_pd = graphene.List(PriorityDate)

schema = graphene.Schema(query=Query, types=[PriorityDate])
