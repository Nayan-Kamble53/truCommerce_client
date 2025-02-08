import { FaShoppingCart } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "./ui/separator";
import { useContext } from "react";
import { shopContext } from "@/context/ShopContext";
import { CardWithForm } from "./CartItem";
import CartSummary from "./CartSummary";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Sidebar = () => {
  const { cartProducts } = useContext(shopContext);

  const getCartCount = () => {
    if (cartProducts.length <= 0) return;

    let cartCount = 0;
    cartProducts.map((item) => (cartCount += item.quantity));
    return cartCount;
  };
  return (
    <Sheet className="h-full ">
      <SheetTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <FaShoppingCart className="text-2xl text-gray-300" />
                {cartProducts.length > 0 && (
                  <span
                    className="absolute -top-1 -right-2 bg-green-400 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white"
                  >
                    {getCartCount()}
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your Cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>
      <SheetContent className=" w-full max-h-screen overflow-y-scroll overflow-x-hidden">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription></SheetDescription>
          <Separator />
        </SheetHeader>

        <>
          <CardWithForm />
          <CartSummary className="" />
        </>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
