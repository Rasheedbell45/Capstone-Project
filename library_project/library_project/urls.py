from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# A simple home view
def home(request):
    return HttpResponse("Welcome to the Capstone Project!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('library.urls')),  # Your existing API
    path('', home, name='home'),  # Root URL points here
]
