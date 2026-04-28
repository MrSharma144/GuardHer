from rest_framework import serializers
from .models import EmergencyContact

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = ['id', 'name', 'email', 'phone_number', 'relation', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
