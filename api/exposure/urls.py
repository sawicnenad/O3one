from rest_framework.routers import DefaultRouter
from .views import (ScenarioView)


router = DefaultRouter()
router.register(r'scenarios', ScenarioView)


urlpatterns = [

] + router.urls