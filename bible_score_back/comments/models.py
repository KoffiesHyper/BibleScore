from django.db import models

from users.models import CustomUser

# Create your models here.

class VerseComments(models.Model):
    commentedBy = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='commentedBy')
    verse = models.CharField(max_length=10)
    comment = models.CharField(max_length=500)