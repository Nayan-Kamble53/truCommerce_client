import { useState, useContext } from "react";
import { shopContext } from "../context/ShopContext";
import axios from "axios";
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
import { toast } from "sonner";

const Login = () => {
  // context providers
  const { backendUrl, setToken, setRefreshToken, navigate } =
    useContext(shopContext);

  // login?signup state
  const [currentState, setCurrentState] = useState("login");

  //   controlled input state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidPassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (currentState === "sign-up") {
        if (password.length < 8) {
          toast.error("password must be at least 8 characters");
          return;
        }
        if (!isValidPassword(password)) {
          toast.error(
            "password must contain atleast 1 charectar and 1 number "
          );
          return;
        }

        const response = await axios.post(backendUrl + "/v1/auth/register", {
          email,
          password,
        });
        const token = response.data.tokens.access.token;
        setToken(token);
        const refreshToken = response.data.tokens.refresh.token;
        setRefreshToken(refreshToken);
        setEmail("");
        setPassword("");
        toast.success("Registered Successfully");
        navigate("/");
      } else {
        if (password.length <= 0) return toast.error("Enter Your Password!");
        setLoading(true);
        const response = await axios.post(backendUrl + "/v1/auth/login", {
          email,
          password,
        });
        const token = response.data.tokens.access.token;
        setToken(token);
        const refreshToken = response.data.tokens.refresh.token;
        setRefreshToken(refreshToken);
        setEmail("");
        setPassword("");
        toast.success("Login Successfully");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(
          currentState === "sign-up"
            ? "Email Already exists!"
            : "Incorrect email and password"
        ); // Show error toast
      } else {
        toast.error(
          currentState === "sign-up"
            ? "Registration failed. Try again! "
            : "Login failed. Try again! "
        );
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[60vh] flex justify-center items-center">
      {/* card component */}
      <Card className="w-80 max-w-screen-lg sm:w-96 shadow-2xl">
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
            <Button type="submit" className=" w-full" disabled={loading}>
              {loading && (
                <img
                  src="src\assets\loading.png"
                  className="w-4 animate-spin"
                />
              )}
              {currentState === "sign-up" ? "Sign Up" : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
