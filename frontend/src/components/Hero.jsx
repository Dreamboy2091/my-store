
import heroPhone from "../assets/hero-phone.png";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-text">

                <h1>
                    Everything You Need, All in One Place
                </h1>

                <p>
                    Shop quality products at affordable prices.
                </p>

                <div className="hero-actions">

                    <a
                        className="btn"
                        href="/products"
                    >
                        Shop Now
                    </a>

                </div>

            </div>

            <img
                src={heroPhone}
                alt="Smartphone"
            />

        </section>
    );
}

export default Hero;