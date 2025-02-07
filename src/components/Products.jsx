import {  useEffect, useState, useContext } from "react";
import axios from "axios";
import { ProductCard } from "./Card";
import { shopContext } from "@/context/ShopContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { backendUrl } = useContext(shopContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("first");
        const { data } = await axios.get(`${backendUrl}/v1/products/`);
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

  if (loading)
    return <p className="text-center text-xl">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {products.map((product) => (
          <ProductCard key={product.id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
