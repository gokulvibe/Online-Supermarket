from django.shortcuts import render, redirect
from datetime import datetime
from pytz import timezone
from .models import Invoice, Solddetails
from products.models import Product
from django.http import HttpResponse, JsonResponse
import json
# Create your views here.
def billing(request):
    purchased_items = json.loads(request.POST.get('data', ''))
    
    user_number = request.user.username
    purchase_time = datetime.now().astimezone(timezone('Asia/Kolkata'))
    purchase_time_string = purchase_time.strftime("%d%m%Y%H%M%S")
    invoice_number = purchase_time_string + user_number                 # Logic to create invoice number
    
    invoice_amount = 0
    taxes = 0
    ########################      Calculating total invoice      ################################
    for product_id, quantity in purchased_items.items():
        product = Product.objects.get(product_id=int(product_id))
        cost = product.base_price * int(quantity)
        invoice_amount += cost
    #####################################################################################
    
    invoice_details = Invoice(invoice_number=invoice_number, invoice_amount=invoice_amount, invoice_date=purchase_time, taxes=taxes)
    invoice_details.save()
    
    invoice = Invoice.objects.get(invoice_number=invoice_number)
    user = request.user
    
    ##### Saving data of individual product purchases (Salesdetails model) and updating stock ########
    for product_id, quantity in purchased_items.items():
        product = Product.objects.get(product_id=int(product_id))
        cost = product.base_price * int(quantity)
        initial_product_stock = product.stock_available
        stock_remaining = initial_product_stock - int(quantity)
        product.stock_available = stock_remaining
        product.save()
        
        sold_details = Solddetails(invoice_num=invoice, customer_phone=user, product_id=product, quantity=quantity, cost=cost)
        sold_details.save()
    ####################################################################################
        
    

    return JsonResponse({'success': True})
    