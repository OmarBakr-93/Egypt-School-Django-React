from django.contrib import admin
from .models import Program, Event, Subject, Grade, FeedbackUser, Review, Testimonial

# Register your models here.


admin.site.register(Program)
admin.site.register(Event)
admin.site.register(Subject)
admin.site.register(Grade)
admin.site.register(FeedbackUser)
admin.site.register(Review)
admin.site.register(Testimonial)