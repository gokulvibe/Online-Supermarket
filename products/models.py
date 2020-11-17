from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


class ProductType(models.Model):
    product_type_name = models.CharField(max_length = 100, primary_key = True)
    
    
class Product(models.Model):
    product_id = models.PositiveIntegerField(primary_key = True)
    product_name = models.CharField(max_length = 100)
    product_type_id = models.ForeignKey(ProductType, null = True, on_delete=models.SET_NULL)
    stock_available = models.PositiveIntegerField()
    base_price = models.FloatField()
    discount = models.IntegerField(default = 0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    
    

    