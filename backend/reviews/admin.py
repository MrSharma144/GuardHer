from django.contrib import admin
from .models import AreaReview


@admin.register(AreaReview)
class AreaReviewAdmin(admin.ModelAdmin):
    list_display  = ('area_name', 'safety_rating', 'user', 'created_at')
    list_filter   = ('safety_rating',)
    search_fields = ('area_name', 'user__email', 'review_text')
