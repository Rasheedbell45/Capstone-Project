from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, CheckoutViewSet, UserViewSet
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r"books", BookViewSet, basename="books")
router.register(r"checkouts", CheckoutViewSet, basename="checkouts")
router.register(r"users", UserViewSet, basename="users")

urlpatterns = [
    path("auth/token/", obtain_auth_token, name="api_token_auth"),
    path("", include(router.urls)),
]
