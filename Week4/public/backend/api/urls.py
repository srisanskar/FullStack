from django.urls import path
from .views import (
    VideoListCreateView,
    VideoDetailView,
    CommentCreateView,
    RegisterView,
    LoginView,
    LogoutView,
    ToggleLikeView,
    MyVideosView  # ✅ added
)

urlpatterns = [
    path('videos/', VideoListCreateView.as_view(), name='video-list-create'),
    path('videos/<int:id>/', VideoDetailView.as_view(), name='video-detail'),
    path('videos/<int:id>/like/', ToggleLikeView.as_view(), name='toggle-like'),
    path('comments/', CommentCreateView.as_view(), name='comment-create'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('my-videos/', MyVideosView.as_view(), name='my-videos'),  # ✅ dashboard route
]
