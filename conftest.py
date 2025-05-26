import os
import sys

HERE = os.path.dirname(__file__)
BACKEND = os.path.join(HERE, "backend")
if BACKEND not in sys.path:
    sys.path.insert(0, BACKEND)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gametrack.settings")

from django.conf import settings
settings.DATABASES["default"] = {
    "ENGINE": "django.db.backends.sqlite3",
    "NAME": ":memory:",
}

import django
django.setup()
