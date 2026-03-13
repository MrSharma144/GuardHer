from django.urls import path
from .views import SOSAlertListCreateView, SOSAlertDetailView

urlpatterns = [
    path('', SOSAlertListCreateView.as_view(), name='sos-list-create'),
    path('<int:pk>/', SOSAlertDetailView.as_view(), name='sos-detail'),
]
