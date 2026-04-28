from rest_framework import serializers
from .models import AreaReview


class AreaReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model  = AreaReview
        fields = [
            'id', 'user_name', 'area_name', 'latitude', 'longitude',
            'safety_rating', 'review_text', 'created_at'
        ]
        read_only_fields = ['id', 'user_name', 'created_at']

    def get_user_name(self, obj):
        return obj.user.name if obj.user else 'Anonymous'
