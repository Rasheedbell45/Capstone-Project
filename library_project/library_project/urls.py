from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Capstone Project API!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('library.urls')),
    path('', home, name='home'),  # <-- Root URL
]
