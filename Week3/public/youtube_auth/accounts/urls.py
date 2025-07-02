from django.urls import path
from . import views
from django.views.generic import RedirectView

app_name = 'accounts'

urlpatterns = [
    path('', RedirectView.as_view(url='/login/', permanent=False)),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('verify/<str:token>/', views.verify_view, name='verify'),
]
