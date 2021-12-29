from django.http.response import Http404
from django.shortcuts import render

# Create your views here.
from .models import Testing
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import TestSerializer

class TestingView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = TestSerializer(data=request.data)
        if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format = None):
        tests = Testing.objects.all()
        serializer = TestSerializer(tests, many=True)
        return Response(serializer.data)
        

class TestingDetail(APIView):
    
    def get_object(self, pk):
      try:
        return Testing.objects.get(pk=pk)
      except Testing.DoesNotExist:
        raise Http404

    def delete(self, request, pk, format=None):
      test = self.get_object(pk)
      test.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

      
