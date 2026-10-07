
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";

function ProductDetail() {

    const { id } = useParams();

    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {

        fetch(`http://127.0.0.1:8000/api/products/${id}/`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }, [id]);


    function handleAddToCart() {

        if (product.stock <= 0) {

            setMessage("This product is out of stock.");

            return;
        }

        addToCart(product);

        setMessage(`${product.name} added to cart!`);

        setTimeout(() => {
            setMessage("");
        }, 2500);
    }


    if (!product) {
        return <p>Loading...</p>;
    }


    return (
        <>

            <div className="product-detail">

                <div className="detail-image">

                    <img
                        src={product.image}
                        alt={product.name}
                    />

                </div>


                <div className="detail-info">

                    <h1>{product.name}</h1>

                    <p>{product.description}</p>

                    <h2>
                        ₦{Number(product.price).toLocaleString()}
                    </h2>

                    <p>
                        {product.stock > 0
                            ? `Stock: ${product.stock}`
                            : "Out of Stock"
                        }
                    </p>


                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                    >
                        {product.stock > 0
                            ? "Add to Cart"
                            : "Out of Stock"
                        }
                    </button>

                </div>

            </div>


            {message && (
                <div className="cart-toast">
                    ✓ {message}
                </div>
            )}

        </>
    );
}

export default ProductDetail;