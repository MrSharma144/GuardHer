from django.urls import path
from api.views.authViews import UserPasswordResetView, UserRegistrationView,UserLoginView,UserProfileView,UserChangePasswordView,SendPasswordResetEmailView


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('login/',UserLoginView.as_view(), name='user-login'),
    path('profile/',UserProfileView.as_view(), name='user-profile'),
    path('change-password/',UserChangePasswordView.as_view()
    ,name='user-change-password'),
    path('send-reset-password-email/',SendPasswordResetEmailView.as_view(),name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/',UserPasswordResetView.as_view(),name='user-reset-password'),
]

