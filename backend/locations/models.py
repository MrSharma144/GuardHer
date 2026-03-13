from django.db import models
from django.conf import settings

class SafetyReport(models.Model):
    DANGER_LEVEL_CHOICES = (
        ('high', 'High Danger (Red)'),
        ('medium', 'Medium Danger (Orange)'),
        ('low', 'Safe Area (Green)'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='safety_reports')
    latitude = models.FloatField()
    longitude = models.FloatField()
    danger_level = models.CharField(max_length=10, choices=DANGER_LEVEL_CHOICES)
    description = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report {self.get_danger_level_display()} at {self.latitude}, {self.longitude}"
