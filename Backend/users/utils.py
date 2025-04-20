from django.core.mail import EmailMessage
from django.conf import settings
from rest_framework import permissions

FROM_EMAIL = settings.DEFAULT_FROM_EMAIL

class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
        subject=data['subject'],
        body=data['body'],
        from_email=FROM_EMAIL,
        to=[data['to_email']]
        )
        email.send()

class IsAdminOrSelf(permissions.BasePermission):
    """
    Custom permission to only allow users to access their own profile or admins to access any profile.
    """
    def has_permission(self, request, view):
        # Allow access to own profile
        if not view.kwargs.get('user_id'):
            return True
        return True

    def has_object_permission(self, request, view, obj):
        # Allow access to own profile or if user is admin
        return obj == request.user or request.user.is_admin