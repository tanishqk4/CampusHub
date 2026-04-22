from django.urls import path

from .views import CampusTokenObtainPairView, CampusTokenRefreshView, ProfileView, RegisterView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CampusTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", CampusTokenRefreshView.as_view(), name="token_refresh"),
    path("me/", ProfileView.as_view(), name="profile"),
]
