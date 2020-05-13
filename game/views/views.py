# from django.contrib.auth.forms import PasswordResetForm
from django.shortcuts import redirect, render
from django.views.generic import TemplateView, View
from django.contrib.auth import authenticate, login
from game.models import User, Game
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib import messages
from django.contrib.auth import get_user
from django.shortcuts import get_object_or_404
import json


class HomeView(TemplateView):
    template_name = "home.html"

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect("/lobby/")
        else:
            return render(request, "home.html", {"title": "Home"})
        super(HomeView, self).dispatch(request, *args, **kwargs)


class LobbyView(TemplateView):
    template_name = "components/lobby/lobby.html"

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super(LobbyView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(LobbyView, self).get_context_data(**kwargs)
        available_games = [
            {"creator": game.creator.username, "id": game.pk}
            for game in Game.get_available_games()
        ]
        completed_games = Game.get_available_games()
        player_games = Game.get_games_for_player(self.request.user)

        return context


class GameView(TemplateView):
    template_name = "components/game/game.html"
    game = None

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        self.game = Game.get_by_id(kwargs["game_id"])
        user = get_user(request)
        self.game.check_timeout()
        if self.game.creator == user or self.game.opponent == user:
            return super(GameView, self).dispatch(request, *args, **kwargs)

        if not self.game.opponent and not self.game.completed:
            self.game.opponent = user
            self.game.save()
            hounds = [(1, 0), (3, 0), (5, 0), (7, 0)]
            for coords in hounds:
                square = self.game.get_square_by_coords(coords)
                if square and square.status == "Free":
                    square.status = "Claimed"
                    square.owner = user
                    square.save()

            self.game.send_game_update()
            return super(GameView, self).dispatch(request, *args, **kwargs)
        else:
            messages.add_message(
                request, messages.ERROR, "Sorry, the selected game is not available for you."
            )
            return redirect("/lobby/")

    def get_context_data(self, **kwargs):
        context = super(GameView, self).get_context_data(**kwargs)
        context["game"] = self.game

        return context


def about(request):
    return render(request, "about.html", {"title": "About"})
