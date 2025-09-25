from django.urls import path
from . import views

app_name='categories'

urlpatterns = [
    path('', views.show_categories, name='show_categories'),
    path('add/', views.add_category, name='add_category'),
    path('edit/<int:category_id>/', views.edit_category, name='edit_category'),
    path('delete/<int:category_id>/', views.delete_category, name='delete_category'),
]
