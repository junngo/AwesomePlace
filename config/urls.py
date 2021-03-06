from django.conf import settings
from django.urls import include, path
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views
from rest_framework_jwt.views import obtain_jwt_token
from awesomeplace import views

urlpatterns = [
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    # path(
    #     "users/",
    #     include(("awesomeplace.users.urls", "users"), namespace="users"),
    # ),
    #path("accounts/", include("allauth.urls")),
    #url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),

    # Your stuff: custom urls includes go here
    url(r'^users/', include(('awesomeplace.users.urls', 'users'), namespace='users')),
    url(r'^images/', include(('awesomeplace.images.urls', 'images'), namespace='images')),
    url(r'^notifications/'
        , include(('awesomeplace.notifications.urls', 'notifications')
        , namespace='notifications')),
    url(r'^', views.ReactAppView.as_view()),
    
] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
