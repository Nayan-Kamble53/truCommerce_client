import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import AboutUs from "./pages/About";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen w-full bg-indigo-300">
      <Navbar />
      <div className="h-full">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
      <Footer />
      {/* toastify */}
      <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover />
      <Toaster />
    </div>
  );
}

export default App;
