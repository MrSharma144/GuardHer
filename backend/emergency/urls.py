from django.urls import path
from .views import (
    SOSAlertListCreateView, SOSAlertDetailView,
    SendSOSAlertView, PredictZoneView,
    CrimeZonesView, MLGridPredictionView,
    NotifyRiskZoneView,
)

urlpatterns = [
    path('', SOSAlertListCreateView.as_view(), name='sos-list-create'),
    path('<int:pk>/', SOSAlertDetailView.as_view(), name='sos-detail'),
    path('sos-alert/', SendSOSAlertView.as_view(), name='sos-alert'),
    path('predict-zone/', PredictZoneView.as_view(), name='predict-zone'),
    path('crime-zones/', CrimeZonesView.as_view(), name='crime-zones'),
    path('ml-grid/', MLGridPredictionView.as_view(), name='ml-grid'),
    path('notify-risk-zone/', NotifyRiskZoneView.as_view(), name='notify-risk-zone'),
]
