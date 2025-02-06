import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const shopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const value = { backendUrl, token, setToken, navigate};

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export default ShopContextProvider;
