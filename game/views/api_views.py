from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, renderers
from game.serializers import *
from game.models import *
from django.shortcuts import get_object_or_404
from django.http import Http404


class StaffBrowsableMixin(object):
    def get_renderers(self):
        """
        Add Browsable API renderer if user is staff.
        """
        rends = self.renderer_classes
        if self.request.user and self.request.user.is_staff:
            rends.append(renderers.BrowsableAPIRenderer)
        return [renderer() for renderer in rends]


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer


class PlayerGameViewSet(viewsets.ViewSet):
    """
    API endpoint for player games
    """

    def list(self, request):
        queryset = Game.get_games_for_player(self.request.user)
        serializer = GameSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)


class AvailableGameViewSet(viewsets.ViewSet):
    """
    API endpoint for available/open games
    """

    def list(self, request):
        queryset = Game.get_available_games()
        serializer = GameSerializer(queryset, many=True)
        return Response(serializer.data)


class CompletedGameViewSet(viewsets.ViewSet):
    """
    API endpoint for completed games
    """

    def list(self, request):
        queryset = Game.get_completed_games(self.request.user)
        serializer = GameSerializer(queryset, many=True)
        return Response(serializer.data)


class CurrentUserView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class SingleGameViewSet(APIView):
    """
    Get all data for a game: Game Details, Squares, & Log
    """

    def get(self, request, **kwargs):
        game = Game.get_by_id(kwargs["game_id"])
        log = game.get_game_log()
        squares = game.get_all_game_squares()
        game_serializer = GameSerializer(game)
        log_serializer = GameLogSerializer(log, many=True)
        square_serializer = GameSquareSerializer(squares, many=True)
        return_data = {
            "game": game_serializer.data,
            "log": log_serializer.data,
            "squares": square_serializer.data,
        }
        return Response(return_data)


class GameSquaresViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        game = get_object_or_404(Game, pk=pk)
        squares = game.get_all_game_squares()
        serializer = GameSquareSerializer(squares, many=True)
        return Response(serializer.data)
