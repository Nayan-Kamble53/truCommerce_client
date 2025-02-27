import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center min-h-screen w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        About Us
      </h1>
      <p className="text-sm md:text-lg text-gray-300 mb-6">
        Welcome to <span className="font-semibold">ElectroShop</span>, your
        one-stop destination for the latest and greatest in electronics. From
        cutting-edge wireless headphones to high-performance cameras, we bring
        you top-quality gadgets at unbeatable prices.
      </p>

      <div className="flex flex-col md:flex-row gap-5 w-full">
        <Card className="flex-1 shadow-lg rounded-2xl p-5 bg-indigo-200 border-none transform transition-all duration-500 ease-in-out hover:scale-105 w-full md:max-w-md">
          <CardContent>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-4">
              At ElectroShop, we are committed to providing top-tier products,
              seamless shopping experiences, and outstanding customer support.
              We partner with trusted brands to ensure you get the best quality
              electronics.
            </p>
            <ul className="text-left list-disc list-inside text-gray-700 text-sm md:text-base">
              <li>Premium quality gadgets at competitive prices</li>
              <li>Fast and reliable shipping</li>
              <li>Secure payment options</li>
              <li>Dedicated customer support</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="flex-1 shadow-lg rounded-2xl p-5 bg-indigo-200 border-none transform transition-all duration-500 ease-in-out hover:scale-105 w-full md:max-w-md">
          <CardContent>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-4">
              Our mission is to make high-quality electronics accessible to
              everyone. We strive to offer the latest technology with a focus on
              affordability, reliability, and customer satisfaction.
            </p>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Our Values
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              We believe in transparency, innovation, and customer-first
              service. We listen to your needs, continually improve our
              offerings, and ensure that our products meet the highest standards
              of quality.
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="mt-6 text-sm md:text-lg text-gray-300">
        Join thousands of satisfied customers who trust ElectroShop for their
        electronic needs. Elevate your tech game with us today!
      </p>
    </div>
  );
};

export default AboutUs;
