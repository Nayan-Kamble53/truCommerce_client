import { Button } from "@/components/ui/button";
import { shopContext } from "@/context/ShopContext";
import { useContext } from "react";

const Profile = () => {
  const { navigate } = useContext(shopContext);
  return (
    <div className="h-[50vh] flex flex-col items-center justify-center">
      <div className=" flex flex-col items-center justify-center">
        <p className=" text-lg tracking-wide ">
          Profile page is for users, But you are the{" "}
          <span className="text-red-400">Heart</span> of out Products.
        </p>
        <p>Love from TruCommerce.</p>
        <Button className="mt-5" size="lg" onClick={() => navigate("/")}>
          Keep Shopping
        </Button>
      </div>
    </div>
  );
};

export default Profile;
