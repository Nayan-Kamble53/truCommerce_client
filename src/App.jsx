// import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
// import { shopContext } from "./context/ShopContext";
import Home from "./pages/Home";
import AboutUs from "./pages/About";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";

function App() {
  // const { token } = useContext(shopContext);

  return (
    <div className="h-full w-full bg-indigo-300">
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>

      {/* toastify */}
      <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover />
    </div>
  );
}

export default App;
