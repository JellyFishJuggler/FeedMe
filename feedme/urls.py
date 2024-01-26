from django.contrib import admin
from django.urls import path
from feedme import views

urlpatterns = [
    path("", views.index, name='feedme'),
]