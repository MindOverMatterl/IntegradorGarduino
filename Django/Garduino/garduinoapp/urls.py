# urls.py
from django.urls import path, include
from .views import IndexView, CompostadorListView, CompostadorDetailView, protected_view

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('compostador/', CompostadorListView.as_view(), name='compostador-list'),
    path('compostador/<int:pk>/', CompostadorDetailView.as_view(), name='compostador-detail'),
    path('protected/', protected_view, name='protected'),
]
