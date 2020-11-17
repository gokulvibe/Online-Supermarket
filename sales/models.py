from django.db import models
from products.models import Product
from django.contrib.auth.models import User
# Create your models here.

class Invoice(models.Model):
    invoice_number = models.CharField(max_length = 100, primary_key = True)
    invoice_date = models.DateTimeField()
    invoice_amount = models.FloatField()
    taxes = models.FloatField()
    
class Solddetails(models.Model):
    invoice_num = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    customer_phone = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
    quantity = models.PositiveIntegerField()
    