from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
import re

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User  # <-- This should not be a tuple
        fields = ['id', 'username', 'email', 'password']

        # Validate username,password,email -> create user

    def validate_username(self,value):
        if User.objects.filter(username=value).exists():
            raise ValidationError("Username already exists")
        if len(value)<4:
            raise serializers.ValidationError("Username must be atleast 4 charactors long")
        if not re.match(r'^[a-zA-Z0-9_]+$',value):
            raise serializers.ValidationError("Username must contain only letters, numbers, and underscores")
        return value
        
    def validate_email(self,value):
        if User.objects.filter(email=value) :
            raise ValidationError("A user with this email already exists.")
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid email format.")
        return value

    def validate_password(self,value):
        if len(value)<8:
            raise serializers.ValidationError("Password must be at least 8 charactors long.")
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.search(r'[a-z]',value):
            raise serializers.ValidationError("Password must contain atleast one lowercase letter.")
        if not re.search(r'\d',value):
            raise serializers.ValidationError("Password must contain atleast one digit.")
        if not re.search(r'[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]',value):
            raise serializers.ValidationError("Password must contain atleast one special charactor.")
        return value
    
    def create(self,validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
