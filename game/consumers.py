import re
import logging
from channels import Group
from channels.sessions import channel_session
from .models import Game, GameSquare
from channels.auth import (
    http_session_user,
    channel_session_user,
    channel_session_user_from_http,
)
from django.utils.decorators import method_decorator
from channels.generic.websockets import JsonWebsocketConsumer

log = logging.getLogger(__name__)


class LobbyConsumer(JsonWebsocketConsumer):
    http_user = True

    def connection_groups(self, **kwargs):
        """
        Called to return the list of groups to automatically add/remove
        this connection to/from.
        """
        print("Adding a new connection to lobby group")
        return ["lobby"]

    def connect(self, message, **kwargs):
        """
        Perform things on connection start
        """
        pass

    def receive(self, content, **kwargs):
        """
        Called when a message is received with either text or bytes
        filled out.
        """
        channel_session_user = True

        action = content["action"]
        if action == "create_game":
            Game.create_new(self.message.user)

    def disconnect(self, message, **kwargs):
        """
        Perform things on connection close
        """
        pass


class GameConsumer(JsonWebsocketConsumer):
    http_user = True

    def connection_groups(self, **kwargs):
        """
        Called to return the list of groups to automatically add/remove
        this connection to/from.
        """
        return ["game-{0}".format(kwargs["game_id"])]

    def connect(self, message, **kwargs):
        """
        Perform things on connection start
        """
        pass

    def receive(self, content, **kwargs):
        """
        Called when a message is received with either text or bytes
        filled out.
        """
        channel_session_user = True
        action = content["action"]
        print("[Server] Fox and Hounds: Action - {0}".format(action))

        if action == "claim_square":
            square = GameSquare.get_by_id(content["square_id"])
            square.claim("Claimed", self.message.user)

        if action == "change_status":
            square = GameSquare.get_by_id(content["square_id"])
            square.change(content["new_status"], self.message.user)

    def disconnect(self, message, **kwargs):
        """
        Perform things on connection close
        """
        pass
