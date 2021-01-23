from rest_framework.viewsets import ModelViewSet
from .models import (
    Supplier
)
from .serializers import (
    SupplierSer
)



class SupplierView(ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSer