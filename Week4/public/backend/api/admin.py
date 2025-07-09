from django.contrib import admin
from .models import Video, Comment, Profile

class VideoAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        # If channel field is empty, set it to the current user's username
        if not obj.channel:
            obj.channel = request.user.username
        super().save_model(request, obj, form, change)

admin.site.register(Video, VideoAdmin)
admin.site.register(Comment)
admin.site.register(Profile)
