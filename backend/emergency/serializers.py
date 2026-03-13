from rest_framework import serializers
from .models import SOSAlert

class SOSAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = SOSAlert
        fields = ['id', 'timestamp', 'location_latitude', 'location_longitude', 'status']
        read_only_fields = ['id', 'timestamp']
