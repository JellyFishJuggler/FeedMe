from django.shortcuts import render, HttpResponse,redirect
from datetime import datetime
from .models import UserProfile
from .forms import RegistrationForm


# from home.models import Contact
# from django.contrib import messages
# Create your views here.

def index(request):
    return render(request,"index.html")

def register(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success_page')
    else:
        form = RegistrationForm()

    return render(request, "register.html", {'form': form})