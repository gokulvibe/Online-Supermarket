from django.urls import path

from . import views

urlpatterns = [
    path('billing',views.billing,name='billing'),
    path('order',views.order,name='order'),
]