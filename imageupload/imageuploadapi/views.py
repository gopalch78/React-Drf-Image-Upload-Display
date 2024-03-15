from rest_framework import generics, status
from rest_framework.response import Response
from .models import UploadedImage
from .serializers import UploadedImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser
class ImageUploadView(generics.ListCreateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = UploadedImage.objects.all()
    serializer_class = UploadedImageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

