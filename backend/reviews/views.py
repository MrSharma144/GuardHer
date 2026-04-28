from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from .models import AreaReview
from .serializers import AreaReviewSerializer


class AreaReviewListCreateView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        """Return the 50 most recent reviews."""
        reviews = AreaReview.objects.select_related('user').all()[:50]
        serializer = AreaReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Create a review and broadcast it via WebSocket."""
        serializer = AreaReviewSerializer(data=request.data)
        if serializer.is_valid():
            review = serializer.save(user=request.user)

            # Build full payload for broadcast
            payload = AreaReviewSerializer(review).data

            # Broadcast to all WS clients in 'area_reviews' group
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                'area_reviews',
                {
                    'type': 'review.new',  # maps to ReviewConsumer.review_new()
                    'review': payload,
                }
            )

            return Response(payload, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
