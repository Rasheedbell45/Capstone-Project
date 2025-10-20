from datetime import timedelta
from django.utils import timezone
from django.db import transaction
from django.db.models import F
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import get_object_or_404

from .models import Book, Checkout
from .serializers import BookSerializer, CheckoutSerializer, UserSerializer
from .permissions import IsAdminOrReadOnly
from django.contrib.auth.models import User

class BookViewSet(viewsets.ModelViewSet):
    """
    CRUD for books. Read for everyone, create/update/delete for admins.
    """
    queryset = Book.objects.all().order_by("title")
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=False, methods=["get"], url_path="available")
    def available_books(self, request):
        """List only currently available books (available_copies > 0)."""
        qs = self.get_queryset().filter(available_copies__gt=0)
        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def checkout(self, request, pk=None):
        """
        Checkout a single copy of the book for the current user.
        Uses an atomic transaction + select_for_update to prevent race conditions.
        Expects optional JSON: {"days": 14} to set due date days from now (default 14).
        """
        days = int(request.data.get("days", 14))
        user = request.user

        with transaction.atomic():
            # lock the book row to avoid concurrent checkouts reducing available below zero
            book = Book.objects.select_for_update().get(pk=pk)
            if book.available_copies <= 0:
                return Response({"detail": "No copies available."}, status=status.HTTP_400_BAD_REQUEST)

            # decrement available copies
            book.available_copies = F('available_copies') - 1
            book.save(update_fields=['available_copies'])

            due_date = timezone.now() + timedelta(days=days)
            checkout = Checkout.objects.create(book=book, user=user, due_date=due_date)

            # refresh book from DB to get resolved F() value
            book.refresh_from_db()

        serializer = CheckoutSerializer(checkout, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def return_book(self, request, pk=None):
        """
        Return a checked-out copy by the authenticated user.
        Finds the latest non-returned checkout record for the user and book.
        """
        user = request.user
        with transaction.atomic():
            # lock book row to safely increment available_copies
            book = Book.objects.select_for_update().get(pk=pk)
            checkout_qs = Checkout.objects.filter(book=book, user=user, returned_at__isnull=True).order_by("-checked_out_at")

            if not checkout_qs.exists():
                return Response({"detail": "No active checkout found for this user and book."}, status=status.HTTP_400_BAD_REQUEST)

            checkout = checkout_qs.first()
            checkout.returned_at = timezone.now()
            checkout.save(update_fields=["returned_at"])

            # increment available copies
            book.available_copies = F('available_copies') + 1
            book.save(update_fields=['available_copies'])
            book.refresh_from_db()

        serializer = CheckoutSerializer(checkout, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class CheckoutViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Admins can list all checkouts; regular users can list their own checkouts.
    """
    queryset = Checkout.objects.select_related("book", "user").all().order_by("-checked_out_at")
    serializer_class = CheckoutSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return self.queryset
        if user.is_authenticated:
            return self.queryset.filter(user=user)
        return Checkout.objects.none()

class UserViewSet(viewsets.ModelViewSet):
    """
    Basic CRUD for users. For production you probably want to limit fields and protect create/update.
    Admins only for create/update/delete; read allowed for authenticated users (or admin-only).
    """
    queryset = User.objects.all().order_by("username")
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrReadOnly]
