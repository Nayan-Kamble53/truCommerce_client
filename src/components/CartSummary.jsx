import React, { useContext, useEffect } from "react";
import { Button } from "./ui/button";
import { shopContext } from "@/context/ShopContext";

const CartSummary = () => {
  const { getCartAmount, cartAmount } = useContext(shopContext);

  return (
    <div>
      <div className="mt-4 flex justify-between text-lg font-bold">
        <span>Total:</span>
        <span>${cartAmount}</span>
      </div>

      <Button variant="outline" className="w-full">
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
