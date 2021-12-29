from django.db import models
from apps.master.models import Master
from apps.testing.models import Testing

# Create your models here.
class Analytics(models.Model):
    
    master = models.ForeignKey(Master, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add = True)
    testing = models.OneToOneField(Testing, on_delete=models.CASCADE)
    status = models.IntegerField(default=1)

