from django.urls import path
from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^$', views.signIn),
    # url(r'^manage_home/', views.manage_home),
    url(r'^manage_home/', views.manage_home),
    url(r'^employee/', views.employee),
    url(r'^locations/', views.locations),
    url(r'^history/', views.history),
    url(r'^response_help/', views.response_help),
]