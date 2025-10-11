from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LoginView
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('users/login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]