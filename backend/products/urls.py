from django.urls import path

from .views import ProductListView, OrderListView


urlpatterns = [
    path(
        "products/",
        ProductListView.as_view()
    ),

    path(
        "products/<int:id>/",
        ProductListView.as_view()
    ),

    path(
        "orders/",
        OrderListView.as_view()
    ),
]