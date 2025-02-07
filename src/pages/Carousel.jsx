import { Card, CardContent } from "@/components/ui/card";
import img1 from "../assets/img1.png"; // Correct import
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  const images = [img1, img1, img1, img1, img1]; // Store image paths directly

  return (
    // Hide the entire carousel on mobile (only visible on sm+ screens)
    <div className="hidden sm:block">
      <div className="flex justify-center items-start mt-5">
        <Carousel className="w-[90vw]" opts={{ loop: true }}>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <Card className="w-[90vw] h-[50vh] flex justify-center items-center bg-gray-100">
                  <CardContent className="p-0 flex justify-center items-center w-full h-full">
                    <div className="w-full h-full flex justify-center items-center">
                      <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-fill rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
