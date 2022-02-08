import datetime
from tkinter.tix import Tree
from django import views
from django.shortcuts import render
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from users.serializers import FriendRequestSerializer
from .permissions import IsFromFrontEnd
from users.models import CustomUser, FriendRequests
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
def UserSearch(request, usr):
    searchedUsers = CustomUser.objects.filter(username__startswith=usr)
    serializer = UserSerializer(searchedUsers, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT'])
def Friends_List(request, pk):
    user = get_object_or_404(CustomUser, pk=pk)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        addedUserId = request.data.get('id')
        addedUser = CustomUser.objects.get(pk=addedUserId)
        user.addFriend(addedUser)
        serializer = UserSerializer(user)
        return Response(serializer.data)

@api_view(['GET', 'POST', 'DELETE'])
def Friend_Requests(request, pk):
    user = get_object_or_404(CustomUser, pk=pk)

    if request.method == 'GET':
        requests = get_list_or_404(FriendRequests, to_user=pk);
        serializer = FriendRequestSerializer(requests, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        requestedUserId = request.data.get('id')
        requestedUser = CustomUser.objects.get(pk=requestedUserId)
        
        newRequest = FriendRequests(from_user=user, to_user=requestedUser, date_sent=datetime.datetime.now())
        newRequest.save()

        return Response(status=status.HTTP_201_CREATED)
    
    elif request.method == 'DELETE':
        deletedRequest_id = request.data.get('request_id');
        deletedRequest = FriendRequests.objects.get(pk=deletedRequest_id)
        deletedRequest.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def TestPairView(request):
    return Response({ 'detail':  'valid' })
