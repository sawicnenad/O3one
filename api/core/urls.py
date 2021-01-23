from rest_framework.routers import DefaultRouter
from .views import (
    SupplierView
)




router = DefaultRouter()
router.register(r'suppliers', SupplierView)


urlpatterns = [
] + router.urls