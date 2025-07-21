from rest_framework import serializers
from .models import Shayari

class ShayariSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shayari
        fields = ['id', 'title', 'content', 'author', 'category', 'created_at']