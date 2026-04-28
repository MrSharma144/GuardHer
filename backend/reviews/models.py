from django.db import models
from django.conf import settings


SAFETY_CHOICES = [
    ('very_safe',      'Very Safe'),
    ('safe',           'Safe'),
    ('moderate',       'Moderate Risk'),
    ('high_risk',      'High Risk'),
    ('very_high_risk', 'Very High Risk'),
]


class AreaReview(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='area_reviews'
    )
    area_name  = models.CharField(max_length=200)
    latitude   = models.FloatField(null=True, blank=True)
    longitude  = models.FloatField(null=True, blank=True)
    safety_rating = models.CharField(max_length=20, choices=SAFETY_CHOICES)
    review_text   = models.TextField(max_length=1000)
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} — {self.area_name} ({self.safety_rating})"
