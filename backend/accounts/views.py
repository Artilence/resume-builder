from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer


# 1. Register View (Public)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# 2. Custom Login View (Sets access + refresh tokens in cookies)
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # Call the parent method to get the response (which includes tokens)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Get the user from the validated serializer
        user = serializer.user
        
        response = super().post(request, *args, **kwargs)
        access_token = response.data['access']
        refresh_token = response.data['refresh']

        # Store Access Token in HttpOnly Cookie
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=True,      # Use HTTPS in production
            samesite='Lax',
            max_age=300       # 5 minutes (example)
        )

        # Store Refresh Token in HttpOnly Cookie
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite='Lax',
            max_age=3600 * 24 # 1 day
        )

        # Remove tokens from the response body
        del response.data['access']
        del response.data['refresh']

        # Add user data to the response
        response.data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }

        return response


# 3. Custom Refresh View (Handles Refresh from Cookies)
class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        request = self.context['request']
        refresh_cookie = request.COOKIES.get('refresh_token')

        if refresh_cookie:
            attrs['refresh'] = refresh_cookie
            return super().validate(attrs)
        raise ValidationError('No refresh token found in cookies')


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            return Response({"error": "Invalid or expired refresh token"}, status=status.HTTP_401_UNAUTHORIZED)

        new_access = serializer.validated_data['access']
        response = Response({"detail": "Token refreshed"})

        # Set new Access Token in HttpOnly Cookie
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
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })
