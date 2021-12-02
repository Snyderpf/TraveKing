from django.urls import path 
from . import views

urlpatterns = [
    
    path('', views.index, name ='index'),
    #path('blog', views.blog, name ='blog'),
    path('car',views.car, name = 'car'),
    path('contact', views.contact, name = 'contact'),
    path('flight',views.flight, name = 'flight'),
    path('hotel.html', views.hotel, name = 'hotel'),
    path('vacation', views.vacation, name = 'vacation')
]