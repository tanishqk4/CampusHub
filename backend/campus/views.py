from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Announcement, Department, Event, EventInterest, LostFoundItem, Reminder, Resource, Tag
from .serializers import (
    AnnouncementSerializer,
    DepartmentSerializer,
    EventInterestSerializer,
    EventSerializer,
    LostFoundItemSerializer,
    ReminderSerializer,
    ResourceSerializer,
    TagSerializer,
)


class PublicReadAuthWriteMixin:
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class DepartmentViewSet(PublicReadAuthWriteMixin, viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class TagViewSet(PublicReadAuthWriteMixin, viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class AnnouncementViewSet(PublicReadAuthWriteMixin, viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer

    def get_queryset(self):
        queryset = Announcement.objects.select_related("department", "posted_by").prefetch_related("tags")
        department = self.request.query_params.get("department")
        tag = self.request.query_params.get("tag")
        urgent = self.request.query_params.get("urgent")

        if department:
            queryset = queryset.filter(department__code__iexact=department)
        if tag:
            queryset = queryset.filter(tags__slug__iexact=tag)
        if urgent in {"true", "false"}:
            queryset = queryset.filter(is_urgent=urgent == "true")
        return queryset.distinct()

    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)


class EventViewSet(PublicReadAuthWriteMixin, viewsets.ModelViewSet):
    serializer_class = EventSerializer

    def get_queryset(self):
        queryset = Event.objects.select_related("department").prefetch_related("tags", "interested_users")
        department = self.request.query_params.get("department")
        tag = self.request.query_params.get("tag")

        if department:
            queryset = queryset.filter(department__code__iexact=department)
        if tag:
            queryset = queryset.filter(tags__slug__iexact=tag)
        return queryset.distinct()

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def interested(self, request, pk=None):
        event = self.get_object()
        interest, created = EventInterest.objects.get_or_create(user=request.user, event=event)
        serializer = EventInterestSerializer(interest)
        return Response({"created": created, "interest": serializer.data})


class ResourceViewSet(PublicReadAuthWriteMixin, viewsets.ModelViewSet):
    serializer_class = ResourceSerializer

    def get_queryset(self):
        queryset = Resource.objects.select_related("department", "uploaded_by")
        department = self.request.query_params.get("department")
        semester = self.request.query_params.get("semester")
        resource_type = self.request.query_params.get("type")

        if department:
            queryset = queryset.filter(department__code__iexact=department)
        if semester:
            queryset = queryset.filter(semester=semester)
        if resource_type:
            queryset = queryset.filter(resource_type=resource_type)
        return queryset

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


class LostFoundItemViewSet(PublicReadAuthWriteMixin, viewsets.ModelViewSet):
    serializer_class = LostFoundItemSerializer

    def get_queryset(self):
        queryset = LostFoundItem.objects.select_related("reported_by")
        status_value = self.request.query_params.get("status")
        category = self.request.query_params.get("category")

        if status_value:
            queryset = queryset.filter(status=status_value)
        if category:
            queryset = queryset.filter(category__iexact=category)
        return queryset

    def perform_create(self, serializer):
        serializer.save(reported_by=self.request.user)


class ReminderViewSet(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Reminder.objects.filter(user=self.request.user).select_related("announcement", "event")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
