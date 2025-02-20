from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ContentIdea(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    target_audience = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    hook = models.TextField(blank=True)
    outline = models.TextField(blank=True)
    tags = models.JSONField(default=list)
    status = models.CharField(max_length=200, default="draft")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
class Scripts(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content_idea = models.ForeignKey(ContentIdea, on_delete=models.CASCADE)
    content = models.TextField()
    version = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.content_idea.title} - Version {self.version}"
