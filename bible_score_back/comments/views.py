from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from users.models import CustomUser
from .serializers import CommentSerializer
from .models import VerseComments
from django.utils import timezone

# Create your views here.

@api_view(['GET', 'POST', 'DELETE'])
def CommentView(request, verse):
    if request.method == 'GET':
        comments = get_list_or_404(VerseComments, verse=verse)

        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        commentedBy = get_object_or_404(CustomUser, id=request.data.get('commentedBy'))
        
        newComment = VerseComments(
            commentedBy=commentedBy, 
            verse=verse, 
            comment=request.data.get('comment'),
            comment_date=timezone.now()
        )

        newComment.save()
        serializer = CommentSerializer(newComment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def CommentDetailView(request, id):
    if request.method == 'PUT':
        user = get_object_or_404(CustomUser, pk=request.data.get('user_id'))
