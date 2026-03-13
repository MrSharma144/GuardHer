from rest_framework import generics, permissions
from .models import SOSAlert
from .serializers import SOSAlertSerializer

class SOSAlertListCreateView(generics.ListCreateAPIView):
    serializer_class = SOSAlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SOSAlert.objects.filter(user=self.request.user).order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SOSAlertDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SOSAlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SOSAlert.objects.filter(user=self.request.user)
