# Library Management System API

A Django REST Framework (DRF) powered API for managing a library system.  
Users can register, borrow and return books, and view available books.  
Supports full CRUD operations on **Books** and **Users**.

## Features
- CRUD operations for Books and Users
- Checkout & Return book endpoints
- Token Authentication with DRF
- Permissions: only authenticated users can borrow/return
- Deployable on **Heroku** or **PythonAnywhere**

## Tech Stack
- **Python 3.11**
- **Django 5.x**
- **Django REST Framework**
- **PostgreSQL** (Heroku) / SQLite (local dev)
- **Gunicorn** + **Whitenoise**

## Setup & Installation

1. Clone this repo:
   ```bash
   git clone <your-repo-url>
   cd library_project
