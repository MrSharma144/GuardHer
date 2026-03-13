from django.urls import path
from .views import SafetyReportListCreateView, HeatmapDataView

urlpatterns = [
    path('reports/', SafetyReportListCreateView.as_view(), name='report-list-create'),
    path('heatmap-data/', HeatmapDataView.as_view(), name='heatmap-data'),
]
