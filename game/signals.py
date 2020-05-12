from django.dispatch import receiver
from game.models import *
from channels import Group
from django.db.models.signals import post_save
from .serializers import *
from .models import Game, GameSquare, GameLog
import json


@receiver(post_save, sender=Game)
def new_game_handler(**kwargs):
    """
    When a new game is created, this builds a list of all open games and 
    sends it down to all channels in the 'lobby' group
    """
    if kwargs["created"]:
        avail_game_list = Game.get_available_games()
        avail_serializer = GameSerializer(avail_game_list, many=True)
        Group("lobby").send({"text": json.dumps(avail_serializer.data)})
