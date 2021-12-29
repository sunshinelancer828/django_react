from django.urls import path
from .views import analytics, analytics_detail

analytics_urlpatterns = [
    path('analytics', analytics, name='analytics'),
    path('analytics/<int:pk>', analytics_detail, name="analytics-detail")
    
]