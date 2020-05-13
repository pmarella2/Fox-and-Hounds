from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
import re


class SameCharacterRepeatingValidator:
    def __init__(self, min_length=3):
        self.min_length = min_length

    def validate(self, password, user=None):
        for char in password:
            if password.count(char) >= self.min_length:
                char_check = char * self.min_length
                if char_check in password:
                    raise ValidationError(
                        _(
                            "The password has too many characters repeating consecutively (eg. iiii or 4444)"
                        ),
                        code="password_repeating",
                    )

    def get_help_text(self):
        return _(
            "Your password must not characters repeating consecutively (eg. iiii or 4444)."
        )


class SymbolValidator(object):
    def validate(self, password, user=None):
        if not re.findall("[()[\]{}|\\`~!@#$%^&*_\-+=;:'\",<>./?]", password):
            raise ValidationError(
                _(
                    "The password must contain at least 1 symbol: "
                    + "()[]{}|\`~!@#$%^&*_-+=;:'\",<>./?"
                ),
                code="password_no_symbol",
            )

    def get_help_text(self):
        return _(
            "Your password must contain at least 1 symbol: "
            + "()[]{}|\`~!@#$%^&*_-+=;:'\",<>./?"
        )
