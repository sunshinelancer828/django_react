from django.urls import path
from .views import master, master_detail

master_urlpatterns = [
    path('master/upload', master, name='master-upload'),
    path('master/masters', master, name='master-masters'),
    path('master/masters/<int:pk>', master_detail, name="master-detail")
]