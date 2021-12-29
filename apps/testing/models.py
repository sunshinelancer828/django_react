from django.db import models
import os

def wrapper(instance, filename):
    return os.path.join('test_sheet', filename)

# Create your models here.
class Testing(models.Model):
    file = models.FileField(upload_to=wrapper, blank=False, default="", null = False)
    timestamp = models.DateTimeField(auto_now_add = True)
    status = models.TextField(default = False)
