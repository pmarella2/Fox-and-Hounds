from django.contrib import admin
from django_otp.admin import OTPAdminSite
from .models import Game, GameLog

admin.site.__class__ = OTPAdminSite
admin.site.register(Game)
admin.site.register(GameLog)