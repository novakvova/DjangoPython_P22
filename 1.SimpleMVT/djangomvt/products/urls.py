from django.urls import path
from . import views

app_name='products'

urlpatterns = [
    path('', views.show_products, name='show_products'),
    path('add/', views.add_product, name='add_product'),
    # path('edit/<int:product_id>/', views.edit_product, name='edit_product'),
    # path('delete/<int:product_id>/', views.delete_product, name='delete_product'),
]
