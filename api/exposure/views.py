from rest_framework import viewsets
from .models import (Scenario)
from .serializers import (ScenarioSer)

class ScenarioView(viewsets.ModelViewSet):
    queryset = Scenario.objects.all()
    serializer_class = ScenarioSer