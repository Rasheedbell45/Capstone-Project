from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Checkout

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")
        read_only_fields = ("id",)

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"
        read_only_fields = ("available_copies", "created_at")

class CheckoutSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), source='book', write_only=True
    )

    class Meta:
        model = Checkout
        fields = ("id", "book", "book_id", "user", "checked_out_at", "due_date", "returned_at")
        read_only_fields = ("id", "checked_out_at", "returned_at", "user", "book")
