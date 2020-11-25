from django.shortcuts import render, redirect
from datetime import datetime
from pytz import timezone
from .models import Invoice, Solddetails
from products.models import Product
from django.http import HttpResponse, JsonResponse
import json
from django.core import serializers
import math
# Create your views here.

def billing(request):
    purchased_items = json.loads(request.POST.get('data', ''))
    
    user_number = request.user.username
    purchase_time = datetime.now().astimezone(timezone('Asia/Kolkata'))
    purchase_time_string = purchase_time.strftime("%d%m%Y%H%M%S")
    invoice_number = purchase_time_string + user_number                 # Logic to create invoice number
    
    invoice_amount = 0
    taxes = 0.01
    total_discount = 0
    ########################      Calculating total invoice      ################################
    for product_id, quantity in purchased_items.items():
        product = Product.objects.get(product_id=int(product_id))
        discount = (product.discount/100)*product.base_price
        cost = (product.base_price-discount) * int(quantity)
        invoice_amount += cost
        total_discount += discount * int(quantity)
        
    invoice_amount += math.floor(taxes*invoice_amount)
    tax_amount = math.floor(taxes*invoice_amount)
    
    invoice_amount = math.floor(invoice_amount)
        
    #####################################################################################
    
    invoice_details = Invoice(invoice_number=invoice_number, invoice_amount=invoice_amount, invoice_date=purchase_time, taxes=tax_amount, discount=total_discount)
    invoice_details.save()
    
    invoice = Invoice.objects.get(invoice_number=invoice_number)
    user = request.user
    
    sold_products_details = {}
    ##### Saving data of individual product purchases (Salesdetails model) and updating stock ########
    for product_id, quantity in purchased_items.items():
        product = Product.objects.get(product_id=int(product_id))
        cost = product.base_price * int(quantity)
        initial_product_stock = product.stock_available
        stock_remaining = initial_product_stock - int(quantity)
        product.stock_available = stock_remaining
        product.save()
        
        temp_dict = {}
        temp_dict["prod_name"] = product.product_name
        temp_dict["cost_of_one"] = product.base_price
        temp_dict["quantity"] = int(quantity)
        temp_dict["total_cost"] = cost
        sold_products_details[product_id] = temp_dict
        
        sold_details = Solddetails(invoice_num=invoice, customer_phone=user, product_id=product, quantity=quantity, cost=cost)
        sold_details.save()
    ####################################################################################
    
    request.session['invoice'] = invoice_number
    request.session['name'] = request.user.first_name + " " + request.user.last_name
    request.session['invoice_date'] = purchase_time.strftime("%d-%m-%Y, %H:%M:%S")
    request.session['sold_products_details'] = sold_products_details
    request.session['taxes'] = tax_amount
    request.session['discount'] = total_discount
    request.session['invoice_amount'] = invoice_amount
        
    

    return JsonResponse({'success': True})
    
    
    
def order(request):
    invoice_number = request.session['invoice']
    customer_name = request.session['name']
    purchase_time =  request.session['invoice_date']
    sold_products_details =  request.session['sold_products_details']
    tax_amount = request.session['taxes']
    total_discount = request.session['discount']
    invoice_amount =  request.session['invoice_amount']
    
    products_bill_temp = json.dumps(sold_products_details)
    sold_products_details = json.loads(products_bill_temp)
      
    return render(request,'sales/invoicepage.html', 
                  context = {'invoice_number':invoice_number,
                             'customer_name':customer_name,
                             'purchase_time':purchase_time,
                             'sold_products_details':sold_products_details,
                             'tax_amount':tax_amount,
                             'total_discount':total_discount,
                             'invoice_amount':invoice_amount
                             })