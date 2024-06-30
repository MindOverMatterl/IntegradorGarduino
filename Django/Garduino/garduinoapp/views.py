# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Compostador
from .serializer import CompostadorSerializer

class IndexView(APIView):
    def get(self, request):
        context = {'mensaje': 'servidor activo'}
        return Response(context)

class CompostadorListView(APIView):
    def get(self, request):
        compostadores = Compostador.objects.all()
        serializer = CompostadorSerializer(compostadores, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CompostadorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CompostadorDetailView(APIView):
    def get_object(self, pk):
        try:
            return Compostador.objects.get(pk=pk)
        except Compostador.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        compostador = self.get_object(pk)
        serializer = CompostadorSerializer(compostador)
        return Response(serializer.data)

    def put(self, request, pk):
        compostador = self.get_object(pk)
        serializer = CompostadorSerializer(compostador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        compostador = self.get_object(pk)
        compostador.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Compostador
from .serializer import CompostadorSerializer

class IndexView(APIView):
    def get(self, request):
        context = {'mensaje': 'servidor activo'}
        return Response(context)

class CompostadorListView(APIView):
    def get(self, request):
        compostadores = Compostador.objects.all()
        serializer = CompostadorSerializer(compostadores, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CompostadorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CompostadorDetailView(APIView):
    def get_object(self, pk):
        try:
            return Compostador.objects.get(pk=pk)
        except Compostador.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        compostador = self.get_object(pk)
        serializer = CompostadorSerializer(compostador)
        return Response(serializer.data)

    def put(self, request, pk):
        compostador = self.get_object(pk)
        serializer = CompostadorSerializer(compostador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        compostador = self.get_object(pk)
        compostador.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({"message": "This is a protected view"})

