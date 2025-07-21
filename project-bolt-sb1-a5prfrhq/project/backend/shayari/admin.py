from django.contrib import admin
from .models import Shayari

@admin.register(Shayari)
class ShayariAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'created_at']
    list_filter = ['category', 'author', 'created_at']
    search_fields = ['title', 'content', 'author']
    ordering = ['-created_at']