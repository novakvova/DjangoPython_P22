from django.urls import path
from . import views

app_name='categories'

urlpatterns = [
    path('', views.show_categories, name='show_categories'),
    path('add/', views.add_category, name='add_category'),
]
