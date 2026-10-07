import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

function Cart() {

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useContext(CartContext);


    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * item.quantity,
        0
    );


    if (cart.length === 0) {

        return (
            <div className="cart-empty">

                <h2>Your Cart is Empty</h2>

                <p>
                    Cart Items: {cart.length}
                </p>

                <Link to="/">
                    Continue Shopping
                </Link>

            </div>
        );
    }


    return (

        <section className="cart-section">

            <h1>Your Cart</h1>


            <div className="cart-items">

                {cart.map(item => (

                    <div
                        className="cart-item"
                        key={item.id}
                    >

                        <img
                            src={item.image}
                            alt={item.name}
                        />


                        <div className="cart-info">

                            <h3>
                                {item.name}
                            </h3>


                            <p>
                                ₦{Number(item.price).toLocaleString()}
                            </p>


                            <div className="quantity">

                                <button
                                    onClick={() =>
                                        decreaseQuantity(item.id)
                                    }
                                >
                                    -
                                </button>


                                <span>
                                    {item.quantity}
                                </span>


                                <button
                                    onClick={() =>
                                        increaseQuantity(item.id)
                                    }
                                >
                                    +
                                </button>

                            </div>


                            <button
                                className="remove-btn"
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                ))}

            </div>


            <div className="cart-total">

                <h2>
                    Total: ₦{total.toLocaleString()}
                </h2>


                <Link to="/checkout">

                    <button>
                        Checkout
                    </button>

                </Link>

            </div>

        </section>
    );
}

export default Cart;