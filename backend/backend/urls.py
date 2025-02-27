"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/register/', CreateUserView.as_view(), name='register'),
    path('api/v1/users/me/', UserDetailView.as_view(), name='user-detail'),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('api/v1/', include('api.urls')),
    path('api/v1/auth/', include('rest_framework.urls')),
    
]
