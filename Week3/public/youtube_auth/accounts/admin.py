from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import Profile

# Unregister the original User admin
admin.site.unregister(User)

# Register a custom User admin
@admin.register(User)
class CustomUserAdmin(DefaultUserAdmin):
    list_display = ('username', 'email', 'is_active', 'is_staff')
    search_fields = ['username', 'email']
    ordering = ['username']

# Register the Profile model
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user']
