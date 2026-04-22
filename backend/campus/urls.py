from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import AnnouncementViewSet, DepartmentViewSet, EventViewSet, LostFoundItemViewSet, ReminderViewSet, ResourceViewSet, TagViewSet

router = DefaultRouter()
router.register("departments", DepartmentViewSet, basename="department")
router.register("tags", TagViewSet, basename="tag")
router.register("announcements", AnnouncementViewSet, basename="announcement")
router.register("events", EventViewSet, basename="event")
router.register("resources", ResourceViewSet, basename="resource")
router.register("lost-found", LostFoundItemViewSet, basename="lost-found")
router.register("reminders", ReminderViewSet, basename="reminder")

urlpatterns = [
    path("", include(router.urls)),
]
