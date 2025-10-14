from rest_framework.routers import DefaultRouter
from .views import TopicViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'topics', TopicViewSet)

urlpatterns = [
    path('', include(router.urls)),
]