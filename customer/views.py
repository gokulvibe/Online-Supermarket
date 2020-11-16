from django.shortcuts import render, redirect
from django.contrib.auth.models import User,auth
from django.contrib import messages
from .models import Address

def home(request):
    return render(request,"customer/login.html")

def register(request):
    if request.method=='POST':
        first_name=request.POST["first_name"]
        last_name=request.POST["last_name"]
        username=request.POST["phone"]
        password1=request.POST["password1"]
        password2=request.POST["password2"]
        
        address = request.POST["address"]
        zip_code = request.POST["zip"]
        city = request.POST["city"]
        address_type = request.POST["address_type"]
        
        if password1==password2:
            if User.objects.filter(username=username).exists():
                messages.info(request,'Username Taken')
                return redirect('register')
            else:
                user=User.objects.create_user(username=username,password=password1,first_name=first_name,last_name=last_name)
                user.save()
                address_details = Address(address=address, zip_code=zip_code, city=city, address_type=address_type, customer_number=user)
                address_details.save()
                return redirect('/')
        else:
            messages.info(request,'Passwords do not match')
            return redirect('/')
        
    else:
        return render(request,'customer/register.html')