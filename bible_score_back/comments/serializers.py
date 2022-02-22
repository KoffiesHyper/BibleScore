from dataclasses import field
from pyexpat import model
from rest_framework.serializers import ModelSerializer
from .models import VerseComments

class CommentSerializer(ModelSerializer):
    class Meta:
        model = VerseComments
        fields = '__all__'