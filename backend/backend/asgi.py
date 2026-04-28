"""
ASGI config for backend project.
Routes HTTP requests to Django and WebSocket connections to Django Channels.
"""

import os
import django
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from reviews.routing import websocket_urlpatterns

application = ProtocolTypeRouter({
    # Standard Django HTTP
    'http': get_asgi_application(),

    # WebSocket — wrapped in AuthMiddlewareStack so session auth works
    'websocket': AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})
