from django.db import models




class Supplier(models.Model):
    name = models.CharField(max_length=50)
    street = models.CharField(max_length=25, blank=True)
    nr = models.CharField(max_length=10, blank=True, verbose_name="Number")
    post = models.CharField(max_length=10, blank=True, verbose_name="ZIP")
    city = models.CharField(max_length=25, blank=True)
    country = models.CharField(max_length=25)
    info = models.CharField(max_length=255, blank=True, verbose_name="Additional information")


class Substance(models.Model):
    name = models.CharField(max_length=50)
    iupac = models.TextField(blank=True)
    molecular_formula = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=25, blank=True)


class Mixture(models.Model):
    name = models.CharField(max_length=50)


class Workplace(models.Model):
    name = models.CharField(max_length=50)