import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "./Card";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/v1/products");
        setProducts(data.products || data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        console.log(err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* <h2 className="text-2xl font-bold text-center mb-4">Our Products</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {products.map((product) => (
          <ProductCard key={product.id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
