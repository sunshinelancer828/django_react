from django.db import models
import os

def wrapper(instance, filename):
    return os.path.join('logo', filename)

# Create your models here.
class Setting(models.Model):
    logoUrl = models.FileField(upload_to=wrapper, default="", blank=False, null = False)
    welcomeText = models.CharField(default="", max_length=255)
    