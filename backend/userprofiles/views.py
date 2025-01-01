from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from .models import Profile
from .serializers import ProfileSerializer
# Create your views here.

class ProfileCreateView(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self,serializer):
        try:
            serializer.save(user=self.request.user)
        except ValidationError as e:
            raise ValidationError({"error":str(e)})
            
    def create(self,request,*args,**kwargs):

        try:
            return super().create(request,*args,**kwargs)
        except ValidationError as e:
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
