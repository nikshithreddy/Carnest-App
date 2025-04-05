from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class UserManager(BaseUserManager):
    def create_user(
        self,
        email,
        first_name,
        last_name,
        phone_number,
        terms_and_conditions_accepted,
        password=None,
        password2=None        
    ):
        """
        Create and saves a User with the given email, first_name,last_name, phone_number, terms_and_conditions_accepted, password.
        """
        if not email:
            raise ValueError("User must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            first_name= first_name,
            last_name=last_name,
            phone_number=phone_number,
            terms_and_conditions_accepted=terms_and_conditions_accepted
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(
            self,
            email,
            first_name,
            last_name,
            terms_and_conditions_accepted,
            phone_number=None,
            password=None,
    ):
        """
        Creates and saves a superuser with the given email, first_name, last_name, phone_number, terms_and_conditions_accepted, password.
        """
        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            terms_and_conditions_accepted=terms_and_conditions_accepted
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


# Create your models here.
class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    first_name = models.CharField(max_length=30, default="None")
    last_name = models.CharField(max_length=30, blank=True,default="None")
    phone_number = models.CharField(max_length=15, unique=True,null=True, blank=True)
    
    #Personal details
    date_of_birth = models.DateField(null=True, blank=True)
    address= models.TextField(null=True, blank=True)

    #Activity details
    last_modified_date = models.DateTimeField(auto_now=True)

    #Security and compliance
    terms_and_conditions_accepted = models.BooleanField(default=False)
    
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "terms_and_conditions_accepted"]