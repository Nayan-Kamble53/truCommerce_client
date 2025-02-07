import { FaShoppingCart } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  // SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "./ui/separator";
import { useContext, useEffect } from "react";
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
  return (
    <Sheet className="h-full">
      <SheetTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <FaShoppingCart className="text-2xl text-gray-300" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your Cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription></SheetDescription>
          <Separator />
        </SheetHeader>

        {/* main content */}
        <CardWithForm />
        <CartSummary className="" />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
