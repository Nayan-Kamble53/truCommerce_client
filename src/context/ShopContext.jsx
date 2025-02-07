import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

export const shopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh-token")
      ? localStorage.getItem("refresh-token")
      : ""
  );
  const [cartProducts, setCartProducts] = useState([]);
  const [cartId, setCartID] = useState([]);
  const [cartAmount, setCartAmount] = useState([]);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh-token", refreshToken);
  }, [token]);

  const addToCart = async (productId, quantity) => {
    try {
      if (!token) {
        console.log("clicked");
        navigate("/login");
        console.log("user not login");
      }

      // const token_decode = jwtDecode(token);
      const response = await axios.post(
        backendUrl + "/v1/cart/",
        {
          productId,
          quantity: quantity,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      setCartID((prev) => [...prev, response.data.id]);
      toast.success("Item added to Your Cart");
    } catch (error) {
      console.log(error);
    }
  };

  const getCartItems = async () => {
    try {
      const token_decode = jwtDecode(token);
      const userId = token_decode.sub;
      const response = await axios.get(backendUrl + "/v1/cart/" + userId, {
        headers: { Authorization: "Bearer " + token },
      });
      setCartProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartItems();
    getCartAmount();
    removeItemFromCart();
  }, [token, cartId]);

  const removeItemFromCart = async (productId, quantity) => {
    try {
      if (!token) {
        return;
      }
      // const token_decode = jwtDecode(token);
      const response = await axios.delete(backendUrl + "/v1/cart/", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId, quantity }, // ✅ Correct way to send data in DELETE request
      });
      setCartID(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const getCartAmount = async () => {
    try {
      const token_decode = jwtDecode(token);
      const userId = token_decode.sub;
      const response = await axios.get(backendUrl + "/v1/cart/" + userId, {
        headers: { Authorization: "Bearer " + token },
      });
      const cartTotal = response.data.products.reduce((total, product) => {
        return (
          total + Number(product.productId.price) * Number(product.quantity)
        );
      }, 0);
      setCartAmount(cartTotal.toFixed(2));
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
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export default ShopContextProvider;
