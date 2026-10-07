import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

function Checkout() {
    const { cart, clearCart } = useContext(CartContext);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * item.quantity,
        0
    );

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);

        const orderData = {
            customer_name: form.name,
            phone: form.phone,
            address: form.address,
            total: total,
            items: cart.map(item => ({
                product: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/orders/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(orderData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert("Something went wrong.");
                setLoading(false);
                return;
            }

            const message =
                `Hello, I just placed Order #${data.id}.%0A%0A` +
                `Name: ${form.name}%0A` +
                `Phone: ${form.phone}%0A` +
                `Total: ₦${total.toLocaleString()}%0A` +
                `Address: ${form.address}%0A%0A` +
                `I would like to confirm my order.`;

            clearCart();

            window.location.href =
                `https://wa.me/2349128460569?text=${message}`;

        } catch (error) {
            console.error(error);
            alert("Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    }

    if (cart.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Your Cart is Empty</h2>

                <Link to="/">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <section className="checkout">

            <h1>Checkout</h1>

            <div className="checkout-summary">

                <h2>Order Summary</h2>

                {cart.map(item => (
                    <p key={item.id}>
                        {item.name} × {item.quantity}
                    </p>
                ))}

                <h2>
                    Total: ₦{total.toLocaleString()}
                </h2>

            </div>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="address"
                    placeholder="Delivery address"
                    value={form.address}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Placing Order..."
                        : "Place Order & Continue to WhatsApp"
                    }
                </button>

            </form>

        </section>
    );
}

export default Checkout;