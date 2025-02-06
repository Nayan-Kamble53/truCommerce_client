import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function ProductCard({ product }) {
  return (
    // <Card className="mt-6 w-96">
    <Card className="mt-6 w-full max-w-sm">
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
        <Typography className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography variant="h6" color="blue-gray">
          ${product.price}
        </Typography>
        <Button>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
