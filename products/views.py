from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import Product
from django.core import serializers
import json
def list(request):
    products = Product.objects.all()
    tmpJson = serializers.serialize("json",products)
    tmpObj = json.loads(tmpJson)
    return render(request,"products/list.html", context = {'products':tmpObj})