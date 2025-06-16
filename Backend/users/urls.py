from rest_framework.routers import DefaultRouter
from django.urls import path
from users.views import UserRegistrationView, UserLoginView, UserChangePasswordView, SendPasswordResetEmailView, UserPasswordResetView, UserProfileView, GovernmentIdTypesView

router = DefaultRouter()

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-password-reset-email/', SendPasswordResetEmailView.as_view(),name='send-password-reset-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('profile/<int:user_id>/', UserProfileView.as_view(), name='profile-detail'),
    path('government-id-types/', GovernmentIdTypesView.as_view(), name='government-id-types'),
]

urlpatterns += router.urls