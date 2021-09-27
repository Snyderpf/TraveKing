from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request,'destinations/index.html')

def  flights(request):
    return render(request,'destinations/flights.html')
