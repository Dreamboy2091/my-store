
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="products-section">

            <h2>Featured Phones</h2>

            <div className="product-search">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </div>

            <div className="products-grid">

                {filteredProducts.length > 0 ? (

                    filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))

                ) : (

                    <p className="no-products">
                        No products found.
                    </p>

                )}

            </div>

        </section>
    );
}

export default Products;

