from django.urls import path
from . import views

urlpatterns = [
    path('', views.root),
    path('users/', views.user_list_view),
    path('users/<int:pk>', views.user_detail_view),
]