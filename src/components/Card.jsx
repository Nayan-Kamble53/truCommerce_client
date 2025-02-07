import { shopContext } from "@/context/ShopContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext } from "react";

export function ProductCard({ product }) {
  const { navigate, addToCart } = useContext(shopContext);

  return (
    <Card className="mt-6 w-full max-w-sm transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {product.name}
        </Typography>
        <Typography className="text-sm text-gray-600 line-clamp-2 h-12">
          {product.description.length > 70
            ? `${product.description.substring(0, 70)}...`
            : product.description}
        </Typography>
        <Typography
          className="text-sm text-light-blue-600 line-clamp-3"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          Read more...
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography variant="h6" color="blue-gray">
          ${product.price}
        </Typography>
        <Button onClick={() => addToCart(product.id, 1)}>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
