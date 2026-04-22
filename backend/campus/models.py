from django.conf import settings
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Department(TimeStampedModel):
    name = models.CharField(max_length=120, unique=True)
    code = models.CharField(max_length=20, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.code})"


class Tag(TimeStampedModel):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=60, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Announcement(TimeStampedModel):
    title = models.CharField(max_length=200)
    body = models.TextField()
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        related_name="announcements",
        null=True,
        blank=True,
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name="announcements")
    posted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="posted_announcements",
    )
    is_urgent = models.BooleanField(default=False)
    published_at = models.DateTimeField()

    class Meta:
        ordering = ["-published_at"]

    def __str__(self):
        return self.title


class Event(TimeStampedModel):
    title = models.CharField(max_length=200)
    description = models.TextField()
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        related_name="events",
        null=True,
        blank=True,
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name="events")
    location = models.CharField(max_length=200)
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ["start_at"]

    def __str__(self):
        return self.title


class Resource(TimeStampedModel):
    RESOURCE_TYPES = [
        ("syllabus", "Syllabus"),
        ("paper", "Previous Year Paper"),
        ("notes", "Notes"),
        ("guide", "Guide"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        related_name="resources",
        null=True,
        blank=True,
    )
    semester = models.PositiveSmallIntegerField(default=1)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    file_url = models.URLField(blank=True)
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="uploaded_resources",
    )

    class Meta:
        ordering = ["department__name", "semester", "title"]

    def __str__(self):
        return self.title


class LostFoundItem(TimeStampedModel):
    STATUS_CHOICES = [
        ("lost", "Lost"),
        ("found", "Found"),
        ("resolved", "Resolved"),
    ]

    item_name = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    category = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    image_url = models.URLField(blank=True)
    contact_name = models.CharField(max_length=120)
    contact_email = models.EmailField()
    reported_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="lost_found_reports",
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.item_name


class Reminder(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reminders")
    announcement = models.ForeignKey(
        Announcement,
        on_delete=models.CASCADE,
        related_name="reminders",
        null=True,
        blank=True,
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="reminders",
        null=True,
        blank=True,
    )
    remind_at = models.DateTimeField()

    class Meta:
        ordering = ["remind_at"]

    def __str__(self):
        target = self.announcement.title if self.announcement else self.event.title
        return f"{self.user.username} reminder for {target}"


class EventInterest(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="event_interests")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="interested_users")

    class Meta:
        unique_together = ("user", "event")

    def __str__(self):
        return f"{self.user.username} interested in {self.event.title}"
