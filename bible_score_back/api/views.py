from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.models import CustomUser
from users.serializers import UserSerializer

# Create your views here.

@api_view(['GET'])
def root(request):
    return Response({ 'detail' : 'root' })

@api_view(['GET', 'POST'])
def user_list_view(request):
    if request.method == 'GET':
        serializer = UserSerializer(CustomUser.objects.all(), many=True)
        return Response(serializer.data)