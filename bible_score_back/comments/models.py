from datetime import datetime
from django.db import models
from django.contrib.postgres.fields import ArrayField
from users.models import CustomUser

# Create your models here.

class VerseComments(models.Model):
    commentedBy = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='commentedBy')
    verse = models.CharField(max_length=10)
    comment = models.CharField(max_length=500)
    comment_date = models.DateTimeField(default=datetime.now())
    # likes = ArrayField(models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING ,related_name='likes'))