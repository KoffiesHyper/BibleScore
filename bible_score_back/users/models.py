from turtle import back
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class UserManager(UserManager):

    def create_user(self, email, **user_fields):
        if not email:
            raise ValueError('Email is required')

        email = self.normalize_email(email)
        user = self.model(email=email, **user_fields)
        user.set_password(user.password)
        user.save()
        return user

    def create_superuser(self, email, **user_fields):

        user_fields.setdefault('is_staff', True)
        user_fields.setdefault('is_superuser', True)
        user_fields.setdefault('is_active', True)

        if user_fields.get('is_staff') is not True:
            raise ValueError('Value is_staff must be True for a superuser')
        if user_fields.get('is_superuser') is not True:
            raise ValueError('Value is_superuser must be True for a superuser')

        return self.create_user(email, **user_fields) 

class CustomUser(AbstractUser):
    date_of_birth = models.DateField(null=True)
    objects = UserManager()
    email = models.EmailField(unique=True)
    saved_verses = ArrayField(models.CharField(max_length=10), null=True)
    friends = models.ManyToManyField("self", blank=True)

    def __str__(self):
        return self.friends

    def addFriend(self, friend):
        if friend not in self.friends.all():
            self.friends.add(friend)
            self.save()

    def removeFriend(self, friend):
        if friend in self.friends.all():
            self.friends.remove(friend)
            self.save()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class FriendRequests(models.Model):
    from_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='from_user', null=False, default=1)
    to_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='to_user', null=False, default=2)
    date_sent = models.DateTimeField(null=True)