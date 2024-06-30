from django.db import models

class Compostador(models.Model):
    temperatura = models.FloatField()
    humedad = models.FloatField()
    velocidad_motor = models.IntegerField()

    def __str__(self):
        return f"Compostador - Temperatura: {self.temperatura}, Humedad: {self.humedad}, Velocidad del Motor: {self.velocidad_motor}"
