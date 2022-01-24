from django import views
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .permissions import IsFromFrontEnd
from users.models import CustomUser
from users.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.

@api_view(['GET'])
def root(request):
    return Response({ 'detail' : 'root' })

# @api_view(['GET', 'POST'])
# def user_list_view(request):
#     if request.method == 'GET':
#         serializer = UserSerializer(CustomUser.objects.all(), many=True)
#         return Response(serializer.data)

#     if request.method == 'POST':
#         serializer = UserSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def user_detail_view(request, pk):
#     user = get_object_or_404(CustomUser, pk=pk)

#     if request.method == 'GET':
#         serializer = UserSerializer(user)
#         return Response(serializer.data)

#     if request.method == 'PUT':
#         serializer = UserSerializer(user, data=request.data)
        
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     if request.method == 'DELETE':
#         user.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def TestPairView(request):
    return Response({ 'detail':  'valid' })
