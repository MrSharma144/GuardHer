from django.urls import path
from .views import SOSAlertListCreateView, SOSAlertDetailView, SendSOSAlertView, PredictZoneView

urlpatterns = [
    path('', SOSAlertListCreateView.as_view(), name='sos-list-create'),
    path('<int:pk>/', SOSAlertDetailView.as_view(), name='sos-detail'),
    path('sos-alert/', SendSOSAlertView.as_view(), name='sos-alert'),
    path('predict-zone/', PredictZoneView.as_view(), name='predict-zone')
]
