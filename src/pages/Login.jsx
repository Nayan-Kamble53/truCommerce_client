import { useState, useContext } from "react";
import { shopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Login = () => {
  // context providers
  const { backendUrl, setToken } = useContext(shopContext);

  // login?signup state
  const [currentState, setCurrentState] = useState("sign-up");

  //   controlled input state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "sign-up") {
        const response = await axios.post(backendUrl + "/v1/auth/register", {
          email,
          password,
        });
        toast.success(response.data.message);
        setEmail("");
        setPassword("");
      } else {
        const response = await axios.post(backendUrl + "/v1/auth/login", {
          email,
          password,
        });
        const token = response.data.tokens.access.token;
        console.log(token);
        setToken(token);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {/* card component */}
      <Card className="w-80 max-w-screen-lg sm:w-96">
        <form onSubmit={handleSubmit} className=" w-80 max-w-screen-lg sm:w-96">
          <CardHeader>
            <CardTitle>
              {currentState === "sign-up" ? "Sign up" : "Login"}
            </CardTitle>
            <CardDescription className=" text-gray-900 font-medium">
              Nice to meet You!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <Label variant="h6" color="blue-gray" className="tracking-wide">
                Email
              </Label>
              <Input
                size="lg"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label variant="h6" color="blue-gray" className="tracking-wide">
                Password
              </Label>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Label className=" mt-1 block text-right group">
              {currentState === "sign-up" ? (
                <span
                  className=" cursor-pointer text-sm text-gray-900 mt-1"
                  onClick={() => setCurrentState("login")}
                >
                  Already have an account? Log In
                </span>
              ) : (
                <span
                  className=" cursor-pointer text-sm text-gray-900 mt-1"
                  onClick={() => setCurrentState("sign-up")}
                >
                  Do not have an account? Sign up
                </span>
              )}
            </Label>
          </CardContent>
          <CardFooter>
            <Button type="submit" className=" w-full">
              {currentState === "sign-up" ? "Sign Up" : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
