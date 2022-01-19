from rest_framework.serializers import ModelSerializer
from .models import CustomUser

class UserSerializer(ModelSerializer):

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(user.password)
        user.save()
        return user

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'date_of_birth', 'is_superuser']