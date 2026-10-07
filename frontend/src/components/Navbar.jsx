
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import logo from "../assets/logo.jpg";

function Navbar() {

    const { cart } = useContext(CartContext);

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <nav>

            <div className="header">
                <Link to="/">
                    <img src={logo} alt="My Store logo" />
                </Link>

                <h2>My Store</h2>
            </div>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                <Link to="/cart" className="cart-link">
                    Cart
                    {cartCount > 0 && (
                        <span className="cart-badge">
                            {cartCount}
                        </span>
                    )}
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;