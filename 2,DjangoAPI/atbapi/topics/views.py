from rest_framework.viewsets import ModelViewSet

from .serializers import TopicSerializer
from .models import Topic

# Create your views here.
class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer