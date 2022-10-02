from django.db import models
from django.contrib.auth.models import AbstractBaseUser, \
    BaseUserManager, PermissionsMixin
from django.utils import timezone


class UserManager(BaseUserManager):
    def _create_user(self, email, password, phone, is_staff, is_superuser,
                     **extra_fields):
        if not email:
            raise ValueError('Email must be set')

        if not phone:
            raise ValueError('phone number must be set')

        user = self.model(email=email,
            phone_number=phone,
            is_superuser=is_superuser,
            is_staff=is_staff,
            created_at=timezone.now(),
            **extra_fields)

        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_superuser(self, email, phone=1, password=None, **extra_fields):
        return self._create_user(email, password, phone, True, True, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user
    """
    GENDER = (
        (0, 'Male'),
        (1, 'Female')
    )

    # username = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    birth_date = models.DateTimeField(null=True, blank=True)
    gender = models.IntegerField(choices=GENDER, blank=True, null=True)
    phone_number = models.CharField(max_length=15, unique=True)
    is_superuser = models.BooleanField(default=0)
    is_staff = models.BooleanField(default=0)
    is_active = models.BooleanField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    objects = UserManager()
    username = None
    USERNAME_FIELD = 'email'
