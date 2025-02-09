import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "sonner";

export const shopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh-token") || ""
  );
  const [cartProducts, setCartProducts] = useState([]);
  const [cartId, setCartID] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh-token", refreshToken);
  }, [token, refreshToken]);

  const addToCart = async (productId, quantity) => {
    try {
      if (!token) {
        console.log("User not logged in");
        toast.info("User isn't loged in, Login first");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/v1/cart/`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartID((prev) => [...prev, response.data.id]);
      toast.success("Item added to cart");
      getCartItems(); // Refresh cart after adding an item
      getCartAmount(); // Update total price
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const getCartItems = async () => {
    try {
      if (!token) return;

      const token_decode = jwtDecode(token);
      const userId = token_decode.sub;
      const response = await axios.get(`${backendUrl}/v1/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const removeItemFromCart = async (productId, quantity) => {
    try {
      if (!token) return;

      const response = await axios.delete(`${backendUrl}/v1/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId, quantity }, // ✅ Correct way to send data in DELETE request
      });

      if (response.data) {
        setCartID((prev) => prev.filter((id) => id !== response.data.id));
        getCartItems(); // Refresh cart after item removal
        getCartAmount(); // Update total price
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const getCartAmount = async () => {
    try {
      if (!token) return;

      const token_decode = jwtDecode(token);
      const userId = token_decode.sub;
      const response = await axios.get(`${backendUrl}/v1/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.products) {
        const cartTotal = response.data.products.reduce((total, product) => {
          return (
            total + Number(product.productId.price) * Number(product.quantity)
          );
        }, 0);
        setCartAmount(cartTotal.toFixed(2));
      }
    } catch (error) {
      console.error("Error calculating cart total:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getCartItems();
      getCartAmount();
    }
  }, [token, cartId]);
  // useEffect(() => {
  //   if (cartProducts.length > 0) {
  //     getCartItems();
  //     getCartAmount();
  //   }
  // }, [cartProducts]);

  // console.log("Cart Products:", cartProducts);
  // console.log("Cart Total:", cartAmount);

  const increaseCartItem = async (productId, currentQuantity) => {
    try {
      let newQuantity = currentQuantity + 1;

      await axios.put(
        `${backendUrl}/v1/cart/update`,
        {
          productId,
          quantity: newQuantity,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartProducts((prev) =>
        prev.map((item) =>
          item.productId?.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseCartItem = async (productId, currentQuantity) => {
    try {
      if (currentQuantity <= 1) return;

      let newQuantity = currentQuantity - 1;

      await axios.put(
        `${backendUrl}/v1/cart/update`,
        {
          productId,
          quantity: newQuantity,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartProducts((prev) =>
        prev.map((item) =>
          item.productId?.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    backendUrl,
    token,
    setToken,
    refreshToken,
    setRefreshToken,
    navigate,
    cartProducts,
    addToCart,
    removeItemFromCart,
    getCartAmount,
    cartAmount,
    increaseCartItem,
    decreaseCartItem,
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export default ShopContextProvider;
