from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('users', views.UserViewSet, 'user-list')

urlpatterns = [
    path('', views.root),
    path('', include(router.urls)),
    path('users/test-pair', views.TestPairView),
    path('users/obtain-pair', TokenObtainPairView.as_view()),
    path('users/refresh', TokenRefreshView.as_view()),
    path('users/friends-list/<int:pk>', views.Friends_List),
    path('users/friends-request/<int:pk>', views.Friend_Requests),
    path('users/search/<str:usr>', views.UserSearch),
    path('users/prayer-request/<int:pk>', views.Prayer_Requests)
]