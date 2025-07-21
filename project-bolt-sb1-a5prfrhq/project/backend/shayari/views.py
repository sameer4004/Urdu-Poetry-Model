from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from .models import Shayari
from .serializers import ShayariSerializer
import requests
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_shayari(request):
    query = request.GET.get('q', '')
    
    if query:
        shayari_list = Shayari.objects.filter(
            Q(title__icontains=query) |
            Q(content__icontains=query) |
            Q(author__icontains=query) |
            Q(category__icontains=query)
        )
    else:
        shayari_list = Shayari.objects.all()[:10]  # Return first 10 if no query
    
    serializer = ShayariSerializer(shayari_list, many=True)
    return Response({
        'success': True,
        'results': serializer.data,
        'count': len(serializer.data)
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_shayari(request):
    shayari_list = Shayari.objects.all()
    serializer = ShayariSerializer(shayari_list, many=True)
    return Response({
        'success': True,
        'results': serializer.data,
        'count': len(serializer.data)
    }, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
def generate_shayari(request):
    word = request.data.get('word')
    if not word:
        return Response({'error': 'No word provided'}, status=400)
    try:
        resp = requests.post('http://127.0.0.1:5001/generate-shayari', json={'word': word})
        if resp.status_code == 200:
            return Response(resp.json())
        else:
            return Response({'error': 'Bi-GRU API error'}, status=500)
    except Exception as e:
        return Response({'error': str(e)}, status=500)