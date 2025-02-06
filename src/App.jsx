// import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
// import { shopContext } from "./context/ShopContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  // const { token } = useContext(shopContext);

  return (
    <div className="h-full w-full bg-indigo-200">
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* toastify */}
      <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover />
    </div>
  );
}

export default App;
