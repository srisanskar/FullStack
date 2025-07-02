from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import CustomUserCreationForm
from .models import Profile
import uuid

# Simulated token storage (in-memory)
tokens = {}

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            profile_image = request.FILES.get('profile_image')
            Profile.objects.create(user=user, profile_image=profile_image)
            token = str(uuid.uuid4())
            tokens[token] = user.username
            return redirect(f'/verify/{token}')
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})

def verify_view(request, token):
    username = tokens.get(token)
    if username:
        user = User.objects.get(username=username)
        user.is_active = True
        user.save()
        messages.success(request, "Account Verified Successfully ✅")
        return redirect('accounts:login')
    return render(request, 'accounts/verify.html')

def login_view(request):
    if request.method == 'POST':
        uname = request.POST.get('username')
        pwd = request.POST.get('password')
        user = authenticate(request, username=uname, password=pwd)
        if user is not None:
            login(request, user)
            messages.success(request, "Logged in successfully ✅")
            return redirect('accounts:dashboard')
        else:
            messages.error(request, "Invalid username or password ❌")
    return render(request, 'accounts/login.html')

def logout_view(request):
    logout(request)
    return redirect('accounts:login')

@login_required(login_url='accounts:login')
def dashboard_view(request):
    profile = Profile.objects.get(user=request.user)

    # Simulate 'watch later' video save
    if request.method == 'POST':
        video = request.POST.get('video')
        watch_later = request.session.get('watch_later', [])
        if video and video not in watch_later:
            watch_later.append(video)
            request.session['watch_later'] = watch_later

    watch_later = request.session.get('watch_later', [])
    return render(request, 'accounts/dashboard.html', {
        'user': request.user,
        'watch_later': watch_later,
        'profile': profile,
    })
