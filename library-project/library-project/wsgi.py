"""
WSGI config for library-project.

It exposes the WSGI callable as a module-level variable named ``application``.

This file is used by WSGI servers (like Gunicorn or uWSGI) to run your project.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "library-project.settings")

application = get_wsgi_application()
