from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from users.serializers import UserRegistrationSerializer, UserLoginSerializer, UserChangePasswordSerializer, SendPasswordResetEmailSerializer, UserPasswordResetSerializer, UserProfileSerializer
from django.contrib.auth import authenticate
from users.renderers import UserRenderer
from users.models import User
from users.utils import IsAdminOrSelf

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

#Generate Token Manually
def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)
    return{
        'refresh':str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_token_for_user(user)
        return Response({'token':token, 'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        print(email,password)
        user = authenticate(email=email, password=password)
        print(user)
        if user is not None:
            token = get_token_for_user(user)
            return Response({'token':token,'msg':'Login Successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
        

class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)
    
class SendPasswordResetEmailView(APIView):
    renderer_classes =[UserRenderer]
    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'msg':'Password Reset link sent successfully. Please check your Email inbox'}, status=status.HTTP_200_OK)
    
class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)
  
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated, IsAdminOrSelf]

    def get_user(self, user_id):
        try:
            user = User.objects.get(id=user_id)
            # Check if the requesting user is either the same user or an admin
            if not (self.request.user == user or self.request.user.is_admin):
                raise PermissionError("You don't have permission to access this profile")
            return user
        except User.DoesNotExist:
            raise Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        except PermissionError as e:
            raise Response({'error': str(e)}, status=status.HTTP_403_FORBIDDEN)

    def get(self, request, user_id=None, format=None):
        try:
            user = self.get_user(user_id) if user_id else request.user
            serializer = UserProfileSerializer(user, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Response as e:
            return e

    def patch(self, request, user_id=None, format=None):
        try:
            user = self.get_user(user_id) if user_id else request.user
            print("Received data:", request.data)  # Debug log
            serializer = UserProfileSerializer(user, data=request.data, partial=True, context={'request': request})
            if serializer.is_valid():
                print("Serializer is valid")  # Debug log
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            print("Serializer errors:", serializer.errors)  # Debug log
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Response as e:
            return e

class GovernmentIDTypeView(APIView):
    def get(self, request, format=None):
        id_types = ["SSN", "Driver's License", "Passport"]
        return Response(id_types, status=status.HTTP_200_OK)
    

class GetAllUsersView(APIView):
    """
    API View to retrive all users.
    Only accessible by admin users.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):

        if not request.user.is_admin:
            return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)
        users = users.objects.all()
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GovernmentIdTypesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the choices from the model
        id_types = [{"value": value, "label": label} for value, label in User.USA_ID_TYPE_CHOICES]
        return Response(id_types)