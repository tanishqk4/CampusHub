from datetime import timedelta

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils import timezone

from campus.models import Announcement, Department, Event, LostFoundItem, Resource, Tag


class Command(BaseCommand):
    help = "Seed CampusHub with demo data."

    def handle(self, *args, **options):
        admin_user, _ = User.objects.get_or_create(
            username="campusadmin",
            defaults={
                "email": "admin@campushub.local",
                "first_name": "Campus",
                "last_name": "Admin",
            },
        )
        admin_user.set_password("CampusHub123")
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.save()

        cse, _ = Department.objects.get_or_create(name="Computer Science", code="CSE")
        ece, _ = Department.objects.get_or_create(name="Electronics", code="ECE")
        placements, _ = Tag.objects.get_or_create(name="Placements", slug="placements")
        exams, _ = Tag.objects.get_or_create(name="Exams", slug="exams")
        fest, _ = Tag.objects.get_or_create(name="Fest", slug="fest")

        announcement, _ = Announcement.objects.get_or_create(
            title="Mid-Sem Exam Form Deadline Extended",
            defaults={
                "body": "The registrar has extended the form deadline until Friday 5 PM. Students with pending submissions should complete payment and upload receipts.",
                "department": cse,
                "posted_by": admin_user,
                "is_urgent": True,
                "published_at": timezone.now(),
            },
        )
        announcement.tags.set([exams])

        event, _ = Event.objects.get_or_create(
            title="Spring Placement Readiness Bootcamp",
            defaults={
                "description": "Resume reviews, mock interviews, and company-specific prep tracks for final-year students.",
                "department": cse,
                "location": "Innovation Hall",
                "start_at": timezone.now() + timedelta(days=2),
                "end_at": timezone.now() + timedelta(days=2, hours=3),
                "is_featured": True,
            },
        )
        event.tags.set([placements])

        cultural_event, _ = Event.objects.get_or_create(
            title="Campus Fest Night",
            defaults={
                "description": "Music, food stalls, club showcases, and student performances.",
                "department": ece,
                "location": "Main Quadrangle",
                "start_at": timezone.now() + timedelta(days=5),
                "end_at": timezone.now() + timedelta(days=5, hours=4),
                "is_featured": False,
            },
        )
        cultural_event.tags.set([fest])

        Resource.objects.get_or_create(
            title="DBMS Syllabus 2026",
            defaults={
                "description": "Official semester syllabus for DBMS.",
                "department": cse,
                "semester": 4,
                "resource_type": "syllabus",
                "file_url": "https://example.com/resources/dbms-syllabus.pdf",
                "uploaded_by": admin_user,
            },
        )

        Resource.objects.get_or_create(
            title="Signals and Systems PYQ Set",
            defaults={
                "description": "Curated previous year questions.",
                "department": ece,
                "semester": 3,
                "resource_type": "paper",
                "file_url": "https://example.com/resources/signals-pyq.pdf",
                "uploaded_by": admin_user,
            },
        )

        LostFoundItem.objects.get_or_create(
            item_name="Blue Water Bottle",
            defaults={
                "description": "Left near the library second floor discussion zone.",
                "status": "found",
                "category": "Accessories",
                "location": "Central Library",
                "image_url": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
                "contact_name": "Riya",
                "contact_email": "riya@example.com",
                "reported_by": admin_user,
            },
        )

        LostFoundItem.objects.get_or_create(
            item_name="Student ID Card",
            defaults={
                "description": "ID card lost near Mechanical Block.",
                "status": "lost",
                "category": "Documents",
                "location": "Mechanical Block",
                "image_url": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
                "contact_name": "Arjun",
                "contact_email": "arjun@example.com",
                "reported_by": admin_user,
            },
        )

        self.stdout.write(self.style.SUCCESS("CampusHub demo data seeded successfully."))
