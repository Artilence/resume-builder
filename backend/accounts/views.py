from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.middleware.csrf import get_token
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.tokens import AccessToken


# 1. Register View (Public)
# create a new user
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# 2. Login View (Public)
# get access and refresh tokens
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Get tokens from response
        access_token = response.data['access']
        refresh_token = response.data['refresh']

        # Decode access token to extract user information
        decoded_token = AccessToken(access_token)
        user_id = decoded_token['user_id']

        # Fetch user from database
        user = User.objects.get(id=user_id)

        # Add user info to response data
        response.data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }

        # Set HttpOnly cookies for tokens
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=False,  # Change to True in production
            samesite='Lax',
            max_age=300  # 5 minutes
        )
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=86400  # 1 day
        )

        # Remove tokens from response body
        del response.data['access']
        del response.data['refresh']

        return response
    
# 3. Custom Refresh Serializer
# for validating refresh token from cookies
class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        request = self.context['request']
        refresh_cookie = request.COOKIES.get('refresh_token')

        if refresh_cookie:
            attrs['refresh'] = refresh_cookie
            return super().validate(attrs)
        raise ValidationError('No refresh token found in cookies')

# 4. Custom Refresh View
# for validating refresh token from cookies
# and returning a new access token
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # get the serializer
        serializer = self.get_serializer(data=request.data)
        # validate the serializer

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            return Response({"error": "Invalid or expired refresh token"}, status=status.HTTP_401_UNAUTHORIZED)

        # get the new access token
        new_access = serializer.validated_data['access']
        # create a response
        response = Response({"detail": "Token refreshed"})

        # Set new access token in HttpOnly cookie
        response.set_cookie(
            key='access_token',
            value=new_access,
            httponly=True,
            secure=True,
            samesite='Lax',
            max_age=300  # 5 minutes
        )

        return response



# 4. Logout View (Blacklist Refresh + Clear Cookies)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Invalidate refresh token
            except Exception:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

        # Remove both access and refresh tokens from cookies
        response = Response({"detail": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response


# 5. /me Endpoint (Protected User Data)
# get user data
class MeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print(request.user)
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })

    