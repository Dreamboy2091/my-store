from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer


class ProductListView(APIView):

    def get(self, request, id=None):

        if id:
            product = Product.objects.get(id=id)
            serializer = ProductSerializer(product)
            return Response(serializer.data)

        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)

        return Response(serializer.data)

    def post(self, request):

        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request, id=None):

        product = Product.objects.get(id=id)

        serializer = ProductSerializer(
            product,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, id=None):

        product = Product.objects.get(id=id)

        product.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )


class OrderListView(APIView):

    def post(self, request):

        serializer = OrderSerializer(data=request.data)

        if serializer.is_valid():
            order = serializer.save()

            return Response(
                OrderSerializer(order).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request):

        orders = Order.objects.all().order_by("-created_at")

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)