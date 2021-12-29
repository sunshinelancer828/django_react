from .models import Setting
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import SettingSerializer

@api_view(['GET', 'POST'])
@authentication_classes([])
@permission_classes([])
def settings(request):
    parser_classes = (MultiPartParser, FormParser)

    if request.method == 'POST':
      file_serializer = SettingSerializer(data=request.data)
      if file_serializer.is_valid():
        file_serializer.save()
        return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "GET":
        setting = Setting.objects.all()
        serializer = SettingSerializer(setting, many=True)
        return Response(serializer.data[0])

  
      
