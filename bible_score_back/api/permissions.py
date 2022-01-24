from tkinter.messagebox import RETRY
from rest_framework import permissions
from bible_score_back.settings import API_KEY

class IsFromFrontEnd(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.headers.get('Api_Key') == API_KEY