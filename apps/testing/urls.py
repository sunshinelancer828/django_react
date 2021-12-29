from django.conf.urls import url
from .views import TestingView, TestingDetail

testing_urlpatterns = [
    url(r'^test/upload', TestingView.as_view(), name='test-upload'),
    url(r'^test/tests', TestingView.as_view(), name='test-tests'),
    url(r'^test/tests/<int:pk>/$', TestingDetail.as_view(), name="test-detail")
]