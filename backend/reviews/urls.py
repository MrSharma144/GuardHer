from django.urls import path
from .views import AreaReviewListCreateView

urlpatterns = [
    path('', AreaReviewListCreateView.as_view(), name='area-reviews'),
]
