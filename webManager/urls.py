from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from . import views
# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('homepage', views.homepage),
# ]
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.homepage),
    url(r'^login/', include('fuelManages.urls')),
]