from .models import Master
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import FileSerializer

@api_view(['GET', 'POST'])
def master(request):
    parser_classes = (MultiPartParser, FormParser)

    if request.method == 'POST':
      file_serializer = FileSerializer(data=request.data)
      if file_serializer.is_valid():
        file_serializer.save()
        return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "GET":
        masters = Master.objects.all()
        serializer = FileSerializer(masters, many=True)
        return Response(serializer.data)

@api_view(['DELETE', 'PUT'])
def master_detail(request, pk):
  try:
    master = Master.objects.get(pk=pk)
  except Master.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'DELETE':
    master.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  elif request.method == 'PUT':
    serializer = FileSerializer(master, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
      
