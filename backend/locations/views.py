from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SafetyReport
from .serializers import SafetyReportSerializer

class SafetyReportListCreateView(generics.ListCreateAPIView):
    queryset = SafetyReport.objects.all().order_by('-timestamp')
    serializer_class = SafetyReportSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()

class HeatmapDataView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        reports = SafetyReport.objects.all()
        heatmap_data = []

        intensity_map = {
            'high': 1.0,
            'medium': 0.6,
            'low': 0.2
        }

        for report in reports:
            heatmap_data.append({
                'lat': report.latitude,
                'lng': report.longitude,
                'intensity': intensity_map.get(report.danger_level, 0.5)
            })

        return Response(heatmap_data)
