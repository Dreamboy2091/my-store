import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>

            <div className="footer-content">

                <div className="footer-brand">
                    <h2>My Store</h2>

                    <p>
                        Quality products, affordable prices,
                        and a simple shopping experience.
                    </p>

                    <p className="footer-slogan">
                        Shop smart. Shop with confidence.
                    </p>
                </div>


                <div className="footer-links">
                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                </div>


                <div className="footer-links">
                    <h3>Customer Help</h3>

                    <a href="#">Contact Us</a>
                    <a href="#">Delivery Information</a>
                    <a href="#">Return Policy</a>
                </div>


                <div className="footer-contact">
                    <h3>Contact</h3>

                    <p>📞 +234 912 846 0569</p>
                    <p>✉️ mystore@gmail.com</p>
                    <p>📍 Nigeria, Kano State</p>
                </div>

            </div>


            <div className="footer-bottom">

                <p>
                    © 2026 My Store. All rights reserved.
                </p>

                <p>
                    Built with Django & React
                </p>

            </div>

        </footer>
    );
}

export default Footer;

