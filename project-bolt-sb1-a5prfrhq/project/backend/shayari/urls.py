from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_shayari, name='search_shayari'),
    path('all/', views.get_all_shayari, name='get_all_shayari'),
    path('generate-shayari/', views.generate_shayari, name='generate_shayari'),
]