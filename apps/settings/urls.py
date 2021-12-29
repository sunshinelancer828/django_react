from django.urls import path
from .views import settings

settings_urlpatterns = [
    path('setting', settings, name='settings-list'),
]