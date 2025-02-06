import { FaShoppingCart } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { useContext, useEffect } from "react";
import { shopContext } from "@/context/ShopContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { CardWithForm } from "./CartItem";

const Sidebar = () => {
  const { token, backendUrl } = useContext(shopContext);
  // const [cartProducts, setCartProducts] = useState([]);

  const getCartItems = async () => {
    try {
      const token_decode = jwtDecode(token);
      const userId = token_decode.sub;
      const response = await axios.get(backendUrl + "/v1/cart/" + userId, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <FaShoppingCart className="text-2xl text-gray-300" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <Separator />
        </SheetHeader>

        {/* main content */}
        <CardWithForm/>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
