from rest_framework.serializers import ModelSerializer
from .models import (
    Supplier,
    Substance,
    Mixture,
    Workplace
)




class SupplierSer(ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'