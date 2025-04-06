from rest_framework.routers import DefaultRouter
from django.urls import path
from users.views import UserRegistrationView, UserLoginView, UserChangePasswordView, SendPasswordResetEmailView

router = DefaultRouter()

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-password-reset-email/', SendPasswordResetEmailView.as_view(),name='send-password-reset-email')
]

urlpatterns += router.urls