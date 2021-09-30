from django.urls import path 
from . import views

urlpatterns = [
    
    path('', views.index, name ='index'),
    path('blog', views.blog, name ='blog'),
    path('car',views.car, name = 'car'),
    path('contact', views.contact, name = 'contact'),
    path('flight',views.fligth, name = 'fligth'),
    path('hotel.html', views.hotel, name = 'hotel'),
    path('vacation', views.vacation, name = 'vacation')
]