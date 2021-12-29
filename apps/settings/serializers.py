from rest_framework import serializers
from .models import Setting

class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ['id', 'logoUrl', 'welcomeText']

    def create(self, validated_data):
        Setting.objects.all().delete()
        return Setting.objects.create(**validated_data)

