from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Video, Comment

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class VideoSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    like_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Video
        fields = [
            'id',
            'user',
            'title',
            'video_file',
            'thumbnail',
            'uploaded_at',
            'like_count',
            'is_liked',
            'comments',
            'channel',
            'views',
            'category'  # ✅ NEW
        ]
        read_only_fields = ['id', 'user', 'uploaded_at', 'like_count', 'is_liked', 'comments']

    def get_like_count(self, obj):
        return obj.likes.count()
    
    def get_is_liked(self, obj):
        user = self.context.get('request').user
        return user.is_authenticated and obj.likes.filter(user=user).exists()

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = ['user', 'avatar', 'bio']
