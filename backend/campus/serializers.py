from rest_framework import serializers

from .models import Announcement, Department, Event, EventInterest, LostFoundItem, Reminder, Resource, Tag


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class AnnouncementSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)
    tags_detail = TagSerializer(source="tags", many=True, read_only=True)
    posted_by_name = serializers.CharField(source="posted_by.username", read_only=True)

    class Meta:
        model = Announcement
        fields = [
            "id",
            "title",
            "body",
            "department",
            "department_name",
            "tags",
            "tags_detail",
            "posted_by",
            "posted_by_name",
            "is_urgent",
            "published_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["posted_by", "created_at", "updated_at"]


class EventSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)
    tags_detail = TagSerializer(source="tags", many=True, read_only=True)
    interested_count = serializers.IntegerField(source="interested_users.count", read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "description",
            "department",
            "department_name",
            "tags",
            "tags_detail",
            "location",
            "start_at",
            "end_at",
            "is_featured",
            "interested_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at", "interested_count"]


class ResourceSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)
    uploaded_by_name = serializers.CharField(source="uploaded_by.username", read_only=True)

    class Meta:
        model = Resource
        fields = [
            "id",
            "title",
            "description",
            "department",
            "department_name",
            "semester",
            "resource_type",
            "file_url",
            "uploaded_by",
            "uploaded_by_name",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["uploaded_by", "created_at", "updated_at"]


class LostFoundItemSerializer(serializers.ModelSerializer):
    reported_by_name = serializers.CharField(source="reported_by.username", read_only=True)

    class Meta:
        model = LostFoundItem
        fields = [
            "id",
            "item_name",
            "description",
            "status",
            "category",
            "location",
            "image_url",
            "contact_name",
            "contact_email",
            "reported_by",
            "reported_by_name",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["reported_by", "created_at", "updated_at"]


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at"]


class EventInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventInterest
        fields = "__all__"
