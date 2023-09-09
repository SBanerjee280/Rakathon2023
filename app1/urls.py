from django.urls import path
from app1 import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('', views.fundomatic, name="fundomatic"),
    path('strategy_form',views.strategy_form, name="strategy_form"),
    path('strategy',views.strategy, name="strategy"),
    path('portfolio',views.portfolio, name="portfolio"),
    path('update_portfolio', views.update_portfolio, name="update_portfolio"),
    path('upload_portfolio',views.upload_portfolio, name="upload_portfolio"),
    path('portfolio_insight',views.portfolio_insight, name="portfolio_insight")

]

urlpatterns += staticfiles_urlpatterns()
