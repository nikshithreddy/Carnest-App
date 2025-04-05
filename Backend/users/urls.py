from rest_framework.routers import DefaultRouter
from django.urls import path
from users.views import UserRegistrationView, UserLoginView

router = DefaultRouter()

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),

]

urlpatterns += router.urls