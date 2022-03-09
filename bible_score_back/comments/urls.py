from django.urls import path
from . import views

urlpatterns = [
    path('comments/<str:verse>', views.CommentView)
]