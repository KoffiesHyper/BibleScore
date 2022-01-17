from rest_framework.serializers import ModelSerializer
from .models import CustomUser

class UserSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'date_of_birth', 'is_superuser']