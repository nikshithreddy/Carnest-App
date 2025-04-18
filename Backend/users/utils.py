from django.core.mail import EmailMessage
from django.conf import settings
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