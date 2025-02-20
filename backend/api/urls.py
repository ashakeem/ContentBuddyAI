from django.urls import path
from .views import (
    GenerateContentView,
    ContentIdeaListView,
    ContentIdeaView,
    ScriptView
)

urlpatterns = [
    # Content Generation
    path('generate/', GenerateContentView.as_view(), name='generate-content'),
    
    # Content Ideas
    path('content-ideas/', ContentIdeaListView.as_view(), name='content-idea-list'),
    path('content-ideas/<int:pk>/', ContentIdeaView.as_view(), name='content-idea-detail'),

    # Scripts
    path('content-ideas/<int:content_idea_id>/script/', ScriptView.as_view(), name='script-detail'),
]

