from django.urls import path, include
from .views import ProgramViewSet, SubjectViewSet, EventViewSet, FeedbackViewSet, TestimonialViewSet , GradeViewSet, ReviewViewSet, ProfileViewSet, TeacherViewSet, UserViewSet, StudentViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()


router.register("programs",ProgramViewSet)
router.register("events", EventViewSet)
router.register("testimonials", TestimonialViewSet)
router.register("grades", GradeViewSet)
router.register("reviews", ReviewViewSet)
router.register("feedbacks", FeedbackViewSet)
router.register("subjects",SubjectViewSet)
router.register("teachers", TeacherViewSet)
router.register("students", StudentViewSet)
router.register("profiles", ProfileViewSet)
urlpatterns = [
    path('', include(router.urls)),
]