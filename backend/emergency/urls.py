from django.urls import path
from .views import SOSAlertListCreateView, SOSAlertDetailView, SendSOSAlertView

urlpatterns = [
    path('', SOSAlertListCreateView.as_view(), name='sos-list-create'),
    path('<int:pk>/', SOSAlertDetailView.as_view(), name='sos-detail'),
    path('sos-alert/', SendSOSAlertView.as_view(), name='sos-alert')
]
