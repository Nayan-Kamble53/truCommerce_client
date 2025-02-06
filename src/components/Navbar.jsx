import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Sidebar from "./CartSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { shopContext } from "@/context/ShopContext";
import axios from "axios";

const Navbar = () => {
  const { token, backendUrl, refreshToken } = useContext(shopContext);

  const handleLogout = async () => {
    try {
      await axios.post(backendUrl + "/v1/auth/logout", { refreshToken });
      localStorage.setItem("token", "");
      localStorage.setItem("refresh-token", "");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="shadow-md bg-indigo-500">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 flex items-center"
        >
          <img src={logo} alt="Logo" className="mr-2 w-[100%] h-10" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-blue-500">
            About
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-blue-500">
            Contact
          </Link>
        </div>

        {/* Buttons and Profile */}
        <div className="flex items-center space-x-4">
          {!token && (
            <Link
              to="/login"
              className="px-4 py-2 border rounded-lg text-gray-300 hover:bg-blue-300"
            >
              Login
            </Link>
          )}

          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            {token && (
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 cursor-pointer">
                  <button
                    onClick={handleLogout}
                    className="w-full h-full text-left"
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>

          {/* Cart Icon */}
          <Sidebar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
