from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL

class Book(models.Model):
    title = models.CharField(max_length=300)
    author = models.CharField(max_length=200, blank=True)
    isbn = models.CharField(max_length=20, blank=True, null=True, unique=True)
    total_copies = models.PositiveIntegerField(default=1)
    available_copies = models.IntegerField(default=1)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} — {self.author or 'Unknown'}"

class Checkout(models.Model):
    """
    A record of a checkout. `returned_at` is null until returned.
    """
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="checkouts")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="checkouts")
    checked_out_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    returned_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['book', 'user']),
        ]

    @property
    def is_returned(self):
        return self.returned_at is not None

    def mark_returned(self):
        if not self.is_returned:
            self.returned_at = timezone.now()
            self.save()
