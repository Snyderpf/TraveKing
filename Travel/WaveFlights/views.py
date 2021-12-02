from django.shortcuts import render

# Create your views here.

#def blog(request):
 #   return render (request, 'blog.html')

def car(request):
    return render (request, 'car.html')

def contact(request):
    return render (request, 'contact.html')

def flight(request):
    return render (request, 'flight.html')

def hotel(request):
    return render(request,'hotel.html')

def index(request):
    return render (request, 'index.html')

def vacation(request):
    return render (request, 'vacation.html')

