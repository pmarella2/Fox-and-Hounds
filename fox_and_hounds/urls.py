from django.conf.urls import url, include
from django.urls import path, include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.base import TemplateView
from rest_framework.routers import DefaultRouter
from game.views import *
from users import views as user_views

from django.urls import path

def trigger_error(request):
    division_by_zero = 1 / 0

urlpatterns = [
    path('sentry-debug/', trigger_error),
    # ...
]


urlpatterns += [
    path("admin/", include("admin_honeypot.urls", namespace="admin_honeypot")),
    path("foxmin/", admin.site.urls),
    path("register/", user_views.register, name="register"),
    path("profile/", user_views.profile, name="profile"),
    path(
        "login/",
        auth_views.LoginView.as_view(template_name="users/login.html"),
        name="login",
    ),
    path(
        "logout/",
        auth_views.LogoutView.as_view(template_name="users/logout.html"),
        name="logout",
    ),
    path(
        "password-reset/",
        auth_views.PasswordResetView.as_view(template_name="users/password_reset.html"),
        name="password_reset",
    ),
    path(
        "password-reset/done/",
        auth_views.PasswordResetDoneView.as_view(
            template_name="users/password_reset_done.html"
        ),
        name="password_reset_done",
    ),
    path(
        "password-reset-confirm/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(
            template_name="users/password_reset_confirm.html"
        ),
        name="password_reset_confirm",
    ),
    path(
        "password-reset-complete/",
        auth_views.PasswordResetCompleteView.as_view(
            template_name="users/password_reset_complete.html"
        ),
        name="password_reset_complete",
    ),
    path(
        "robots.txt",
        TemplateView.as_view(
            template_name="game/robots.txt", content_type="text/plain"
        ),
    ),
    path("home/", HomeView.as_view(), name="game-home"),
    path("about/", about, name="game-about"),
    path("", about, name="default"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    url(r"^game/(?P<game_id>\d+)/$", GameView.as_view()),
    url(r"^lobby/$", LobbyView.as_view()),
    url(r"^game-from-id/(?P<game_id>\d+)/$", SingleGameViewSet.as_view()),
    url(r"^current-user/", CurrentUserView.as_view()),
]

router = DefaultRouter()
router.register(r"player-games", PlayerGameViewSet, "player_games")
router.register(r"available-games", AvailableGameViewSet, "available_games")
router.register(r"game-squares", GameSquaresViewSet, "game_squares")
urlpatterns += router.urls
