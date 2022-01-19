from email.policy import default
from multiprocessing.sharedctypes import Value
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager, PermissionsMixin

# Create your models here.

class UserManager(UserManager):

    def create_user(self, **user_fields):
        email = user_fields.get('email')

        if not email:
            raise ValueError('Email is required')

        email = self.normalize_email(email)
        user = self.model(email=email, **user_fields)
        user.set_password(user.password)
        user.save()
        return user

    def create_superuser(self, **user_fields):

        user_fields.setdefault('is_staff', True)
        user_fields.setdefault('is_superuser', True)
        user_fields.setdefault('is_active', True)

        if user_fields.get('is_staff') is not True:
            raise ValueError('Value is_staff must be True for a superuser')
        if user_fields.get('is_superuser') is not True:
            raise ValueError('Value is_superuser must be True for a superuser')

        return self.create_user(**user_fields) 

class CustomUser(AbstractUser):
    date_of_birth = models.DateField(null=True)
    objects = UserManager()