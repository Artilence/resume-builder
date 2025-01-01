from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="profiles")
    profile_name=models.CharField(max_length=100)
    name = models.CharField(max_length=100, blank=False)
    position = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, blank=False)
    phone = models.CharField(max_length=15, blank=False)
    address = models.CharField(max_length=255,blank=True)
    summary = models.TextField(blank=True)

    experiences = models.JSONField(default=list,blank=True)
    education = models.JSONField(default=list,blank=True)
    skills = models.JSONField(default=list,blank=True)
    projects = models.JSONField(default=list,blank=True)
    certifications = models.JSONField(default=list,blank=True)
    languages = models.JSONField(default=list,blank=True)
    hobbies = models.JSONField(default=list,blank=True)
    social_links = models.JSONField(default=list,blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.profile_name} - {self.user.username}"



