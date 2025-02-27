import { Card } from "@/components/ui/card";
import { useContext } from "react";
import { shopContext } from "../context/ShopContext.jsx";
import { MdDelete } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip.jsx";
import { Button } from "./ui/button.jsx";

export function CardWithForm() {
  const {
    cartProducts,
    removeItemFromCart,
    increaseCartItem,
    decreaseCartItem,
  } = useContext(shopContext);

  return (
    <>
      {cartProducts.map((item, index) => {
        if (!item) return;
        return (
          <Card className="w-[350px] mb-4 mt-1" key={`cartItem_${index}`}>
            <div className="p-2 h-24 w-full">
              <div className="w-full grid grid-cols-[3fr_7fr] gap-5 h-full">
                <div className="w-full h-full overflow-hidden rounded-md">
                  <img
                    src={item.productId.image}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="relative">
                  <p className="text-md font-semibold">{item.productId.name}</p>
                  <p className="text-md font-medium">
                    ${item.productId.price.toFixed(2)}
                  </p>
                  <div className="flex gap-5 items-end justify-between">
                    <div className="flex items-center ">
                      <p className="text-sm font-light text-gray-600">
                        Quantity:
                      </p>
                      <div className="flex items-center px-2 rounded-sm justify-evenly">
                        <button
                          className="flex items-center justify-center cursor-pointer w-4 h-4 rounded-full hover:bg-gray-500 disabled:text-gray-400 "
                          onClick={() =>
                            decreaseCartItem(item.productId.id, item.quantity)
                          }
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <p className="flex items-center justify-center w-4">
                          {item.quantity}
                        </p>
                        <button
                          className="flex items-center justify-center cursor-pointer w-4 h-4 rounded-full hover:bg-gray-500"
                          onClick={() =>
                            increaseCartItem(item.productId.id, item.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-md font-semibold">
                      {/* <span className="text-sm font-light text-gray-600">
                        Total:
                      </span>{" "} */}
                      ${(item.productId.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* delete Item from cart Button */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-500/50 cursor-pointer"
                          onClick={() =>
                            removeItemFromCart(
                              item?.productId?.id,
                              item?.quantity
                            )
                          }
                        >
                          <MdDelete />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove Product</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
}
