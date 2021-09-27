from django.core import validators
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Destinations(models.Model):
    title=models.CharField(max_length=200, unique= True)
    image =models.CharField(max_length=1000,)
    country=models.CharField(max_length=200, unique=True)
    calender= models.DateField('date to travel')
    bio= models.TextField(max_length=2500)
    release_date = models.DateField('date released')
    review=models.IntegerField(default=0, validators=[MaxValueValidator(100),MinValueValidator(1)])

    def __str__(self) -> str:
        return self.title