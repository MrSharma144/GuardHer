from rest_framework import serializers
from .models import SafetyReport

class SafetyReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = SafetyReport
        fields = ['id', 'user', 'latitude', 'longitude', 'danger_level', 'description', 'timestamp']
        read_only_fields = ['id', 'user', 'timestamp']
