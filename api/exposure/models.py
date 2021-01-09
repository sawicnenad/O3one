from django.db import models




class Scenario(models.Model):
    name = models.CharField(max_length=25)
    # workplace
    description = models.CharField(max_length=255, blank=True)
    # product
    art = models.TextField(blank=True, verbose_name="ART")
    stoffenmanager = models.TextField(blank=True)
    ecetoc = models.TextField(blank=True, verbose_name="ECETOC TRAv3")
    o3 = models.TextField(blank=True)
