from django.utils.translation import deactivate_all
from rest_framework import serializers
from .models import Master
from datetime import datetime

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Master
        fields = ['id', 'file', 'timestamp', 'active']

    def create(self, validated_data):
        validated_data['timestamp'] = datetime.now()
        print(validated_data)
        return Master.objects.create(**validated_data)

    
    def update(self, instance, validated_data):
        
        try:
            check = Master.objects.get(active=True)
        except Master.DoesNotExist:
            instance.active = True
            instance.save()
            return instance
        
        check.active = False
        check.save()
        instance.active = True
        instance.save()
        return instance

