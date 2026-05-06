from rest_framework import generics, permissions, views, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import SOSAlert, EmergencyAlert
from .serializers import SOSAlertSerializer
from contacts.models import EmergencyContact
import os
import csv
import sys

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

            import threading
            def send_email_task():
                try:
                    send_mail(
                        subject,
                        message,
                        settings.EMAIL_HOST_USER,  # Use authenticated email to avoid SMTP rejection
                        emails,
                        fail_silently=False,
                    )
                except Exception as e:
                    print(f"Error sending email: {e}")
            
            threading.Thread(target=send_email_task).start()
            alert_sent = True

        # Log alert for email sending history
        alert = EmergencyAlert.objects.create(
            user=user,
            latitude=latitude,
            longitude=longitude,
            alert_sent=alert_sent
        )

        # Create an SOSAlert so it appears in the user's Alert History
        SOSAlert.objects.create(
            user=user,
            location_latitude=latitude,
            location_longitude=longitude,
            status='active'
        )

        return Response({"message": "Emergency alert processed", "alert_id": alert.id, "sent": alert_sent}, status=status.HTTP_201_CREATED)

class PredictZoneView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')
        
        if not latitude or not longitude:
            return Response({"error": "Latitude and longitude required."}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            latitude = float(latitude)
            longitude = float(longitude)
        except ValueError:
            return Response({"error": "Invalid coordinates."}, status=status.HTTP_400_BAD_REQUEST)

        # Import ML module dynamically
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        if project_root not in sys.path:
            sys.path.append(project_root)

        try:
            from ml_model.predict_zone import predict_safety_zone
            result = predict_safety_zone(latitude, longitude)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"ML Prediction Error: {e}")
            return Response({"error": "Prediction service unavailable."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CrimeZonesView(views.APIView):
    """Returns all city crime zones from the ML dataset for map rendering."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Locate the CSV dataset relative to this file
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        csv_path = os.path.join(project_root, 'ml_model', 'final_crime_dataset.csv')

        if not os.path.exists(csv_path):
            return Response({'error': 'Dataset not found'}, status=status.HTTP_404_NOT_FOUND)

        zones = []
        try:
            with open(csv_path, newline='', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    try:
                        lat  = float(row['latitude'])
                        lng  = float(row['longitude'])
                        risk = float(row['risk_score'])
                        zones.append({
                            'city':          row['City'],
                            'latitude':      lat,
                            'longitude':     lng,
                            'zone':          row['zone'],              # GREEN / ORANGE / RED
                            'risk_score':    round(risk, 3),
                            'crime_index':   row.get('crime_index', ''),
                            'total_crimes':  row.get('total_crimes', ''),
                            'alert_message': row.get('alert_message', ''),
                        })
                    except (ValueError, KeyError):
                        continue
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(zones, status=status.HTTP_200_OK)


class MLGridPredictionView(views.APIView):
    """
    Batch-predicts a grid of lat/lng points around a centre coordinate
    using the trained ML model.  Returns zone + risk_score for each point.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            centre_lat = float(request.query_params.get('latitude',  28.6139))
            centre_lng = float(request.query_params.get('longitude', 77.2090))
            step       = float(request.query_params.get('step',       0.05))   # ~5 km
            grid_size  = int(request.query_params.get('grid_size',   5))       # 5×5 grid
        except (TypeError, ValueError):
            return Response({'error': 'Invalid parameters'}, status=status.HTTP_400_BAD_REQUEST)

        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        if project_root not in sys.path:
            sys.path.append(project_root)

        try:
            from ml_model.predict_zone import predict_safety_zone
        except Exception as e:
            return Response({'error': f'ML model unavailable: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        half = grid_size // 2
        results = []
        for di in range(-half, half + 1):
            for dj in range(-half, half + 1):
                lat = round(centre_lat + di * step, 6)
                lng = round(centre_lng + dj * step, 6)
                try:
                    pred = predict_safety_zone(lat, lng)
                    results.append({
                        'latitude':      lat,
                        'longitude':     lng,
                        'zone':          pred['zone'],
                        'risk_score':    pred['crime_score'],
                        'alert_message': pred['alert_message'],
                        'source':        'ml_model',
                    })
                except Exception:
                    continue
        return Response(results, status=status.HTTP_200_OK)

class NotifyRiskZoneView(views.APIView):
    """
    Sends an email to the user when they enter an ORANGE or RED risk zone.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        zone = request.data.get('zone', 'Unknown')
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        alert_message = request.data.get('alert_message', 'You are in a high-risk area.')

        maps_link = ""
        if latitude and longitude:
            maps_link = f"https://www.google.com/maps?q={latitude},{longitude}"

        subject = f"⚠️ GuardHer Safety Alert: Entered {zone} Zone ⚠️"
        
        message = f"Hello {user.name or user.email},\n\n"
        message += f"Our system detected that you have entered an area designated as a {zone} risk zone.\n\n"
        message += f"Details: {alert_message}\n\n"
        if maps_link:
            message += f"Your current location: {maps_link}\n\n"
        
        message += "Safety Suggestions:\n"
        message += "- Share your live location with trusted contacts.\n"
        message += "- Avoid isolated or poorly lit streets.\n"
        message += "- Use the GuardHer SOS button if you feel in immediate danger.\n\n"
        message += "Stay safe,\nGuardHer Team"

        import threading
        def send_risk_email_task():
            try:
                send_mail(
                    subject,
                    message,
                    settings.EMAIL_HOST_USER,
                    [user.email],
                    fail_silently=False,
                )
            except Exception as e:
                print(f"Error sending risk zone email: {e}")

        threading.Thread(target=send_risk_email_task).start()
        return Response({"message": "Risk zone alert email sending in background."}, status=status.HTTP_200_OK)

