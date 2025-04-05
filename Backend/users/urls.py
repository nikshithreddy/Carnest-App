from rest_framework.routers import DefaultRouter
from django.urls import path
from users.views import UserRegistrationView

router = DefaultRouter()

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),

]

urlpatterns += router.urls