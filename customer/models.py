from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Address(models.Model):
    address_type_choices = [("HOME", "Home"), ("OFFICE", "Office")]
    customer_number = models.OneToOneField(User, on_delete = models.CASCADE)
    address = models.CharField(max_length = 1000)
    zip_code = models.CharField(max_length = 20)
    city = models.CharField(max_length = 100)
    address_type = models.CharField(max_length = 50, choices = address_type_choices)