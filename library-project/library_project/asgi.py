"""
ASGI config for library_project.

It exposes the ASGI callable as a module-level variable named ``application``.

This file is used by ASGI servers (like Daphne or Uvicorn) to run async Django apps.
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "library_project.settings")

application = get_asgi_application()
