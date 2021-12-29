from django.db import models
import os

def wrapper(instance, filename):
    return os.path.join('master_sheet', filename)

# Create your models here.
class Master(models.Model):
    class Meta:
        ordering = ['id']
    file = models.FileField(upload_to=wrapper, default="", blank=False, null = False)
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=False, blank = True)
    active = models.BooleanField(default = False)
