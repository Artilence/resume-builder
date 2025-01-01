from accounts.serializers import UserSerializer

data = {
    "username": "testuser",
    "email": "invalid_email",
    "password": "123456789"
}

serializer = UserSerializer(data=data)
if not serializer.is_valid():
    print(serializer.errors)
