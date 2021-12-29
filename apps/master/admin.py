from django.contrib import admin
from .models import Master

# Register your models here.
@admin.register(Master)
class MyModelAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return True

    def has_change_permission(self, request, obj=None):
        return True

    def has_delete_permission(self, request, obj=None):
        return True