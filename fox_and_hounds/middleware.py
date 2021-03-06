from django.http import Http404
from inspect import getmodule
import django.contrib.admin.sites
import logging

logger = logging.getLogger("django-app")


class RestrictStaffToAdminMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    @classmethod
    def process_view(cls, request, view_func, view_args, view_kwargs):
        module = getmodule(view_func)
        if (module is django.contrib.admin.sites) and (not request.user.is_staff):
            ip = request.META.get("HTTP_X_REAL_IP", request.META.get("REMOTE_ADDR"))
            ua = request.META.get("HTTP_USER_AGENT")
            logger.warning(
                f'Non-staff user "{request.user}" attempted to access admin site at "{request.get_full_path()}". UA = "{ua}", IP = "{ip}", Method = {request.method}'
            )
            raise Http404("Page is not available for user")
