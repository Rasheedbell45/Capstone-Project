from django.contrib import admin
from .models import Book, Checkout

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "isbn", "available_copies", "total_copies")
    search_fields = ("title", "author", "isbn")

@admin.register(Checkout)
class CheckoutAdmin(admin.ModelAdmin):
    list_display = ("book", "user", "checked_out_at", "due_date", "returned_at")
    list_filter = ("returned_at",)
