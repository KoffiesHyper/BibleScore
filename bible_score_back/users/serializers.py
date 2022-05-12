from pyexpat import model
from rest_framework.serializers import ModelSerializer
from .models import CustomUser, FriendRequests, PrayerRequests

class UserSerializer(ModelSerializer):

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(user.password)
        user.save()
        return user

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'date_of_birth', 'saved_verses', 'friends', 'testimony']

class FriendRequestSerializer(ModelSerializer):
    class Meta:
        model = FriendRequests
        fields = ['date_sent', 'from_user', 'to_user']

class PrayerRequestSerializer(ModelSerializer):
    class Meta:
        model = PrayerRequests
        fields = '__all__'