import { shopContext } from "@/context/ShopContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";

export function ProductCard({ product }) {
  const { token, navigate, backendUrl } = useContext(shopContext);
  const [cartId, setCartId] = useState("");

  const addToCart = async (productId) => {
    console.log("working");
    try {
      if (!token) {
        console.log("clicked");
        navigate("/login");
        console.log("user not login");
      }

      // const token_decode = jwtDecode(token);
      const response = await axios.post(
        backendUrl + "/v1/cart/",
        {
          productId,
          quantity: 1,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log(response);
      setCartId(response.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <Card className="mt-6 w-96">
    <Card className="mt-6 w-full max-w-sm ">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover"/>
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {product.name}
        </Typography>
        <Typography className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </Typography>
      </CardBody> 
      <CardFooter className="pt-0">
        <Typography variant="h6" color="blue-gray">
          ${product.price}
        </Typography>
        <Button onClick={() => addToCart(product.id)}>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
