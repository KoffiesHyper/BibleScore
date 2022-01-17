from multiprocessing.sharedctypes import Value
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin

# Create your models here.

class UserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        
        if not email:
            raise ValueError('Email is required')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Value is_staff must be True for a superuser')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Value is_superuser must be True for a superuser')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    date_of_birth = models.DateField(null=True)

    objects = UserManager()

    REQUIRED_FIELDS = ['email', 'date_of_birth']

    def __str__(self):
        return self.email