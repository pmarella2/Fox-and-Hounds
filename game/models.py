from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from channels import Group
from datetime import datetime
import json


class Game(models.Model):
    winner = models.ForeignKey(
        User, related_name="winner", null=True, blank=True, on_delete=models.DO_NOTHING
    )
    creator = models.ForeignKey(
        User, related_name="creator", on_delete=models.DO_NOTHING
    )
    opponent = models.ForeignKey(
        User,
        related_name="opponent",
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
    )
    cols = models.IntegerField(default=8)
    rows = models.IntegerField(default=8)
    current_turn = models.ForeignKey(
        User, related_name="current_turn", on_delete=models.DO_NOTHING
    )
    active = models.BooleanField(default=False)
    game_over = models.BooleanField(default=False)

    completed = models.DateTimeField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "Game #{0}".format(self.pk)

    @staticmethod
    def get_available_games():
        return Game.objects.filter(opponent=None, completed=None)

    @staticmethod
    def created_count(user):
        return Game.objects.filter(creator=user).count()

    @staticmethod
    def get_games_for_player(user):
        from django.db.models import Q

        return Game.objects.filter(Q(opponent=user) | Q(creator=user))

    @staticmethod
    def get_by_id(id):
        try:
            return Game.objects.get(pk=id)
        except Game.DoesNotExist:
            pass

    @staticmethod
    def create_new(user):
        new_game = Game(creator=user, current_turn=user)
        new_game.save()

        for row in range(new_game.rows):
            for col in range(new_game.cols):
                if (row + col) % 2 == 0:
                    new_square = GameSquare(
                        game=new_game, status="Invalid", row=row, col=col
                    )
                elif row == 7 and col == 0:
                    new_square = GameSquare(
                        game=new_game, status="Claimed", owner=user, row=row, col=col
                    )
                else:
                    new_square = GameSquare(game=new_game, row=row, col=col)

                new_square.save()

        new_game.add_log("Game created by {0}".format(new_game.creator.username))
        return new_game

    def add_log(self, text, user=None):
        entry = GameLog(game=self, text=text, player=user).save()
        return entry

    def get_all_game_squares(self):
        return GameSquare.objects.filter(game=self)

    def get_game_square(self, row, col):
        try:
            return GameSquare.objects.get(game=self, cols=col, rows=row)
        except GameSquare.DoesNotExist:
            return None

    def get_square_by_coords(self, coords):
        try:
            square = GameSquare.objects.get(row=coords[1], col=coords[0], game=self)
            return square
        except GameSquare.DoesNotExist:
            # TODO: Handle exception for gamesquare
            return None

    def get_game_log(self):
        return GameLog.objects.filter(game=self)

    def send_game_update(self):
        from .serializers import GameSquareSerializer, GameLogSerializer, GameSerializer

        squares = self.get_all_game_squares()
        square_serializer = GameSquareSerializer(squares, many=True)
        log = self.get_game_log()
        log_serializer = GameLogSerializer(log, many=True)
        game_serializer = GameSerializer(self)

        message = {
            "game": game_serializer.data,
            "log": log_serializer.data,
            "squares": square_serializer.data,
        }

        game_group = "game-{0}".format(self.id)
        Group(game_group).send({"text": json.dumps(message)})

    def next_player_turn(self):
        self.current_turn = (
            self.creator if self.current_turn != self.creator else self.opponent
        )
        self.save()

    def mark_complete(self, winner):
        self.winner = winner
        self.completed = datetime.now()
        self.save()

    def update_active(self, active):
        self.active = active
        self.save()

    def update_game_status(self, game_over):
        self.game_over = game_over
        self.save()


class GameSquare(models.Model):
    STATUS_TYPES = (
        ("Free", "Free"),
        ("Claimed", "Claimed"),
        ("Active", "Active"),
        ("Invalid", "Invalid"),
    )
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, null=True, blank=True, on_delete=models.DO_NOTHING)
    status = models.CharField(choices=STATUS_TYPES, max_length=25, default="Free")
    row = models.IntegerField()
    col = models.IntegerField()

    # dates
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "{0} - ({1}, {2})".format(self.game, self.col, self.row)

    @staticmethod
    def get_by_id(id):
        try:
            return GameSquare.objects.get(pk=id)
        except GameSquare.DoesNotExist:
            # TODO: Handle exception for gamesquare
            return None

    def get_surrounding_squares(self, square_type):
        results = []
        if square_type == "fox":
            adjacency_matrix = [
                (i, j) for i in (-1, 0, 1) for j in (-1, 0, 1) if not (i == j == 0)
            ]

            for dx, dy in adjacency_matrix:
                # boundaries check
                if (
                    0 <= (self.col + dy) < self.game.cols
                    and 0 <= (self.row + dx) < self.game.rows
                ):
                    results.append((self.col + dy, self.row + dx))
        elif square_type == "hound":
            adjacency_matrix = [
                (i, j) for i in (-1, 0, 1) for j in (-1, 0, 1) if not (i == j == 0)
            ]

            for dx, dy in adjacency_matrix:
                if 0 <= (self.col + dy) < self.game.cols and (self.row + dx) == (
                    self.row - 1
                ):
                    results.append((self.col + dy, self.row + dx))

        return results

    def check_move_fox(self):
        valid = False
        results = self.get_surrounding_squares(square_type="fox")
        for coords in results:
            square = self.game.get_square_by_coords(coords)
            if square and square.status == "Active":
                square.status = "Free"
                square.owner = None
                square.save()
                valid = True

        return valid

    def check_move_hound(self):
        valid = False
        results = self.get_surrounding_squares(square_type="hound")
        for coords in results:
            square = self.game.get_square_by_coords(coords)
            if square and square.status == "Active":
                square.status = "Free"
                square.owner = None
                square.save()
                valid = True

        return valid

    def check_winner(self):
        fox_square = None
        hound_squares = []
        fox_win_condition = False
        hound_win_condition = False
        squares = self.game.get_all_game_squares().filter(status="Claimed")

        for square in squares:
            if square.owner == self.game.creator:
                fox_square = square
            elif square.owner == self.game.opponent:
                hound_squares.append(square)

        if fox_square.row == 0:
            fox_win_condition = True
        else:
            hound_win_condition = True
            results = fox_square.get_surrounding_squares(square_type="fox")
            for coords in results:
                square = self.game.get_square_by_coords(coords)
                if square and square.status == "Free":
                    hound_win_condition = False

        if fox_win_condition == False and hound_win_condition == False:
            fox_win_condition = True
            for hound_square in hound_squares:
                if hound_square.row != 7:
                    fox_win_condition = False

        if fox_win_condition == True:
            return True, "fox"
        elif hound_win_condition == True:
            return True, "hound"
        else:
            return False, "none"

    def claim(self, status_type, user):
        make_move = False
        if user == self.game.creator:
            if self.check_move_fox():
                make_move = True
        elif user == self.game.opponent:
            if self.check_move_hound():
                make_move = True

        if make_move:
            self.owner = user
            self.status = status_type
            self.save(update_fields=["status", "owner"])

            self.game.add_log(
                "{2} moved a piece to ({0}, {1})".format(
                    self.col, self.row, self.owner.username
                )
            )
            self.game.update_active(active=False)

            won, winner = self.check_winner()
            if won and winner == "fox":
                self.game.mark_complete(winner=self.game.creator)
                self.game.update_game_status(game_over=True)
                self.game.add_log("{0} won the game!".format(self.game.creator))
            elif won and winner == "hound":
                self.game.mark_complete(winner=self.game.opponent)
                self.game.update_game_status(game_over=True)
                self.game.add_log("{0} won the game!".format(self.game.opponent))
            else:
                self.game.next_player_turn()

            self.game.send_game_update()

    def change(self, status_type, user):
        if status_type == "Active":
            self.status = status_type
            self.save(update_fields=["status"])
            self.game.update_active(active=True)
            self.game.add_log(
                "{2} selected piece at ({0}, {1})".format(
                    self.col, self.row, self.owner.username
                )
            )
        elif status_type == "Claimed":
            self.status = status_type
            self.save(update_fields=["status"])
            self.game.update_active(active=False)
            self.game.add_log(
                "{2} unselected piece at ({0}, {1})".format(
                    self.col, self.row, self.owner.username
                )
            )

        self.game.send_game_update()


class GameLog(models.Model):
    game = models.ForeignKey(Game, on_delete=models.DO_NOTHING)
    text = models.CharField(max_length=300)
    player = models.ForeignKey(User, null=True, blank=True, on_delete=models.DO_NOTHING)

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "Game #{0} Log".format(self.game.id)
