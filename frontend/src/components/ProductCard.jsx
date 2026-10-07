import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

function ProductCard({ product }) {

    const { addToCart } = useContext(CartContext);

    const [message, setMessage] = useState("");

    const isOutOfStock = product.stock <= 0;

    function handleAddToCart() {

        if (isOutOfStock) {
            return;
        }

        addToCart(product);

        setMessage(`${product.name} added to cart!`);

        setTimeout(() => {
            setMessage("");
        }, 2500);
    }

    return (
        <>
            <div className="product-card">

                <Link
                    to={`/products/${product.id}`}
                    className="product-link"
                >

                    <div className="product-image">

                        <img
                            src={product.image}
                            alt={product.name}
                        />

                    </div>

                    <h3>{product.name}</h3>

                    <p>{product.description}</p>

                    <p className="product-price">
                        ₦{Number(product.price).toLocaleString()}
                    </p>

                    <p
                        className={
                            isOutOfStock
                                ? "stock out-of-stock"
                                : "stock"
                        }
                    >
                        {isOutOfStock
                            ? "Out of Stock"
                            : `Stock: ${product.stock}`
                        }
                    </p>

                </Link>

                <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={
                        isOutOfStock
                            ? "disabled-btn"
                            : ""
                    }
                >
                    {isOutOfStock
                        ? "Out of Stock"
                        : "Add to Cart"
                    }
                </button>

            </div>

            {message && (
                <div className="cart-toast">
                    ✓ {message}
                </div>
            )}
        </>
    );
}

export default ProductCard;

