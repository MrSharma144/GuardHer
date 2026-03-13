from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import SOSAlert, EmergencyAlert
from .serializers import SOSAlertSerializer
from contacts.models import EmergencyContact

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

class SendSOSAlertView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')

        # Generate Google Maps link
        maps_link = ""
        if latitude and longitude:
            maps_link = f"https://www.google.com/maps?q={latitude},{longitude}"

        # Fetch emergency contacts
        contacts = EmergencyContact.objects.filter(user=user)
        emails = [contact.email for contact in contacts if contact.email]

        alert_sent = False
        if emails:
            # Compose email
            user_name = user.name or user.email
            subject = "🚨 EMERGENCY SOS ALERT 🚨"
            message = f"Hello,\n\nThis is an emergency alert.\n\nName: {user_name}\n\n"
            if maps_link:
                message += f"Location:\n{maps_link}\n\n"
            message += "This person may be in danger. Please try to contact them immediately."

            try:
                send_mail(
                    subject,
                    message,
                    user.email,  # Set the sender as the logged-in user's email
                    emails,
                    fail_silently=False,
                )
                alert_sent = True
            except Exception as e:
                print(f"Error sending email: {e}")

        # Log alert
        alert = EmergencyAlert.objects.create(
            user=user,
            latitude=latitude,
            longitude=longitude,
            alert_sent=alert_sent
        )

        return Response({"message": "Emergency alert processed", "alert_id": alert.id, "sent": alert_sent}, status=status.HTTP_201_CREATED)
