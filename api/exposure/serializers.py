from rest_framework import serializers
from .models import (Scenario)


class ScenarioSer(serializers.ModelSerializer):
    
    class Meta:
        model = Scenario
        fields = '__all__'