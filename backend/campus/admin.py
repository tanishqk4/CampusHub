from django.contrib import admin

from .models import Announcement, Department, Event, EventInterest, LostFoundItem, Reminder, Resource, Tag

admin.site.register(Department)
admin.site.register(Tag)
admin.site.register(Announcement)
admin.site.register(Event)
admin.site.register(Resource)
admin.site.register(LostFoundItem)
admin.site.register(Reminder)
admin.site.register(EventInterest)
