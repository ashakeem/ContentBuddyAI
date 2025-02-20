from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, ContentIdea, Scripts
from .serializers import (
    UserSerializer, 
    ContentIdeaDetailSerializer, 
    ScriptSerializer
)
from .services.gemini import ContentGenerator
import json
from asgiref.sync import sync_to_async
from django.http import Http404

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
    permission_classes = [AllowAny]
    
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):   
        return self.request.user
    
    def perform_update(self, serializer):
        if 'password' in self.request.data:
            password = self.request.data['password']
            instance = serializer.save()
            instance.set_password(password)
            instance.save()
        else:
            serializer.save()
            
    def perform_destroy(self, instance):
        instance.delete()

class GenerateContentView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        title = request.data.get('title')
        target_audience = request.data.get('target_audience')
        
        if not title or not target_audience:
            return Response(
                {"error": "Both title and target_audience are required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Generate content using Gemini
            generator = ContentGenerator()
            result = generator.process_content(title, target_audience)
            
            if result["status"] == "error":
                return Response(
                    {"error": result["message"]},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            # Create ContentIdea with script
            content_data = json.loads(result["content_idea"])
            content_idea = ContentIdea.objects.create(
                author=request.user,
                title=content_data["title"],
                target_audience=target_audience,
                description=content_data["description"],
                hook=content_data["hook"],
                outline="\n".join(content_data["outline"]),
                tags=result["tags"],
                status="draft"
            )
            
            # Create Script
            Scripts.objects.create(
                author=request.user,
                content_idea=content_idea,
                content=result["script"],
                version=1
            )
            
            # Return the complete content idea with all related objects
            serializer = ContentIdeaDetailSerializer(content_idea)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ContentIdeaListView(generics.ListCreateAPIView):
    """
    GET: List all content ideas
    POST: Create a new content idea manually (without AI generation)
    """
    serializer_class = ContentIdeaDetailSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ContentIdea.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ContentIdeaView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve a content idea
    PUT/PATCH: Update a content idea
    DELETE: Delete a content idea
    """
    serializer_class = ContentIdeaDetailSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ContentIdea.objects.filter(author=self.request.user)

class ScriptView(generics.RetrieveUpdateAPIView):
    serializer_class = ScriptSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'content_idea_id'
    lookup_url_kwarg = 'content_idea_id'
    
    def get_queryset(self):
        return Scripts.objects.filter(
            content_idea_id=self.kwargs['content_idea_id'],
            content_idea__author=self.request.user
        )
    
    def get_object(self):
        queryset = self.get_queryset()
        obj = queryset.first()
        if not obj:
            raise Http404("No script found for this content idea")
        return obj


