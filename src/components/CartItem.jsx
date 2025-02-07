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

export function CardWithForm() {
  const { cartProducts, removeItemFromCart } =
    useContext(shopContext);

  return (
    <>
      {cartProducts.map((item, index) => {
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
                  <p className="text-xl font-semibold">
                    ${item.productId.price * item.quantity}
                  </p>
                  <p className="text-sm font-light text-gray-600">
                    Quantity:
                    <span className=" text-black"> {item.quantity}</span>
                    {/* <input
                      type="number"
                      name=""
                      id=""
                      className="border p-1 pl-2 rounded-sm w-16"
                      defaultValue={item.quantity}
                    /> */}
                  </p>
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
