from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User


class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')

        if not access_token:
            return None  # No token found, continue unauthenticated

        try:
            # Decode the access token
            validated_token = AccessToken(access_token)
            user_id = validated_token['user_id']

            # Retrieve the user
            user = User.objects.get(id=user_id)

            return (user, validated_token)

        except Exception as e:
            raise AuthenticationFailed('Invalid or expired token')
