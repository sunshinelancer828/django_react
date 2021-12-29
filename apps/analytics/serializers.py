from rest_framework import serializers
from apps.testing.serializers import TestSerializer
from apps.master.serializers import FileSerializer
from .models import Analytics

class AnalyticsSerializer(serializers.ModelSerializer):
    master = FileSerializer()
    testing = TestSerializer()

    class Meta:
        model = Analytics
        fields = ['id', 'timestamp', 'master', 'testing', 'status']
