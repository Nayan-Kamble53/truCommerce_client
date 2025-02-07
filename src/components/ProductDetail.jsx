import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { shopContext } from "@/context/ShopContext";
import { Button } from "@material-tailwind/react";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const ProductDetail = () => {
  const { productId } = useParams();
  const { backendUrl, navigate } = useContext(shopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/v1/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.response.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, backendUrl]);

  if (loading) return <p className="text-center text-xl">Loading product...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container h-screen mx-auto flex justify-center items-center">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full max-w-4xl h-full max-h-[70vh] rounded-lg shadow-2xl bg-indigo-300"
      >
        {/* Product Image Panel */}
        <ResizablePanel defaultSize={50} className="flex justify-center items-center rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-[20vw] rounded-3xl transform transition-all duration-500 ease-in-out hover:scale-105"
          />
        </ResizablePanel>

        {/* Product Details Panel */}
            <ResizablePanel defaultSize={50} className="flex flex-col justify-center p-6">
            <h2 className="text-3xl font-bold text-center">{product.name}</h2>
            <p className="text-gray-300">{product.description}</p>
            <p className="text-gray-300">Experience cutting-edge technology with the {product.name}, designed for seamless performance, durability, and user convenience. Whether you are working, gaming, or enjoying entertainment, this device offers superior speed, crystal-clear audio/visuals, and reliable connectivity. With a sleek, modern design and advanced features, it is built to enhance your daily life while ensuring efficiency and comfort. Perfect for home, office, or on-the-go use, the {product.name} delivers exceptional quality and innovation you can trust.</p>
            <p className="text-xl font-semibold text-gray-300 mt-2">${product.price}</p>
            <Button onClick={() => navigate("/")}>Back to Main</Button>
            </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default ProductDetail;