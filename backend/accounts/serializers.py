from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
import re

# User Serializer
# for creating a new user
class UserSerializer(serializers.ModelSerializer):
    # password is write only
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User  
        # fields to be serialized
        fields = ['id', 'username', 'email', 'password']

        # Validate username,password,email -> create user

    # validate user exists, username length, username format
    def validate_username(self,value):
        # check if username already exists
        if User.objects.filter(username=value).exists():
            raise ValidationError("Username already exists")
        # check if username length is atleast 4
        if len(value)<4:
            raise serializers.ValidationError("Username must be atleast 4 charactors long")
        # check if username contains only letters, numbers, and underscores
        if not re.match(r'^[a-zA-Z0-9_]+$',value):
            raise serializers.ValidationError("Username must contain only letters, numbers, and underscores")
        return value
        
    # validate email
    def validate_email(self,value):
        # check if email already exists
        if User.objects.filter(email=value) :
            raise ValidationError("A user with this email already exists.")
        # check if email is valid
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid email format.")
        return value

    # validate password
    def validate_password(self,value):
        # check if password length is atleast 8
        if len(value)<8:
            raise serializers.ValidationError("Password must be at least 8 charactors long.")
        # check if password contains atleast one uppercase letter
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        # check if password contains atleast one lowercase letter
        if not re.search(r'[a-z]',value):
            raise serializers.ValidationError("Password must contain atleast one lowercase letter.")
        # check if password contains atleast one digit
        if not re.search(r'\d',value):
            raise serializers.ValidationError("Password must contain atleast one digit.")
        # check if password contains atleast one special charactor
        if not re.search(r'[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]',value):
            raise serializers.ValidationError("Password must contain atleast one special charactor.")
        return value
    
    # create user
    def create(self,validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
