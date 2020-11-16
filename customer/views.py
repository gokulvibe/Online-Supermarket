from django.shortcuts import render, redirect
from django.contrib.auth.models import User,auth
from django.contrib import messages
from .models import Address

def home(request):
    if request.user.is_authenticated:
        return render(request, 'products/list.html')
    
    else:
        if request.method=="POST":
            username=request.POST["phone"]
            password=request.POST["password"]
            user=auth.authenticate(username=username,password=password)
            
            if user is not None:
                auth.login(request,user)
                return redirect("products/list")
            else:
                messages.info(request,"Invalid Credentials")
                return redirect('/')
        else:
            return render(request,'customer/login.html')

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
                messages.info(request,'Account with the given mobile number already exists, please try to login instead.')
                return redirect('register')
            else:
                user=User.objects.create_user(username=username,password=password1,first_name=first_name,last_name=last_name)
                user.save()
                address_details = Address(address=address, zip_code=zip_code, city=city, address_type=address_type, customer_number=user)
                address_details.save()
                return redirect('/')
        else:
            messages.info(request,'Passwords do not match')
            return redirect('register')
        
    else:
        return render(request,'customer/register.html')
    
    
def logout(request):
    auth.logout(request)
    return redirect('/')