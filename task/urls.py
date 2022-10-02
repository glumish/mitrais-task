from django.urls import path
from task.views import register_views

urlpatterns = [
    path('', register_views.LoginView.as_view(), name='login-page'),
]