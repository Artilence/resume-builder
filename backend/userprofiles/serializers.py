from rest_framework import serializers
from .models import Profile

# Profile Serializer
# This serializer is used to serialize and deserialize the Profile model
class ProfileSerializer (serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields=['user','created_at','updated_at']

        def validate_social_links(self,value):
            for key,link in value.items():
                if not key.startswith('http'):
                    raise serializers.ValidationError(f'{key} must be a valid URL')
            return value
        
        def create(self,validated_data):
            user = self.context['request'].user
            return Profile.objects.create(user=user,**validated_data)
        
        def update(self,instance,validated_data):
            for attr,value in validated_data.items():
                setattr(instance,attr,value)
        
            instance.save()
            return instance