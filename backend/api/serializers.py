from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ContentIdea, Scripts

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ScriptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scripts
        fields = ["id", "content", "version", "created_at", "updated_at"]
        read_only_fields = ["id", "version", "created_at", "updated_at"]

class ContentIdeaDetailSerializer(serializers.ModelSerializer):
    script = serializers.SerializerMethodField()
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = ContentIdea
        fields = [
            "id", 
            "author",
            "title", 
            "target_audience",
            "description", 
            "hook", 
            "outline", 
            "tags",
            "status",
            "created_at", 
            "updated_at",
            "script"
        ]
        read_only_fields = ["id", "author", "created_at", "updated_at"]

    def get_script(self, obj):
        """Get the latest version of the script for this content idea"""
        try:
            script = Scripts.objects.filter(
                content_idea=obj
            ).order_by('-version').first()
            return ScriptSerializer(script).data
        except Scripts.DoesNotExist:
            return None

    def to_representation(self, instance):
        """Customize the output format"""
        data = super().to_representation(instance)
        # Convert outline from string to list if needed
        if isinstance(data['outline'], str):
            data['outline'] = [line.strip() for line in data['outline'].split('\n') if line.strip()]
        return data
    
    
