from django.contrib.auth.models import User
from rest_framework.test import APIClient, APITestCase
from .models import Book

class CheckoutTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="joe", password="pass")
        self.book = Book.objects.create(title="Test Book", total_copies=1, available_copies=1)

    def test_checkout_and_return(self):
        client = APIClient()
        client.login(username="joe", password="pass")
        resp = client.post(f"/api/books/{self.book.id}/checkout/")
        self.assertEqual(resp.status_code, 201)
        self.book.refresh_from_db()
        self.assertEqual(self.book.available_copies, 0)

        # Return
        resp2 = client.post(f"/api/books/{self.book.id}/return_book/")
        self.assertEqual(resp2.status_code, 200)
        self.book.refresh_from_db()
        self.assertEqual(self.book.available_copies, 1)
