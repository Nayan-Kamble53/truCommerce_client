import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Separator } from "./ui/separator";

const Links = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/" },
  { title: "Privacy & Policy", href: "/" },
];
const SocialLinks = [
  { title: "Facebook", href: "/" },
  { title: "Instagram", href: "/" },
  { title: "Twitter", href: "/" },
  { title: "LinkedIn", href: "/" },
];
const Footer = () => {
  return (
    <div className="bg-indigo-400 flex flex-col gap-5 w-full justify-center items-center text-gray-300 text-lg mt-16 ">
      <div className="w-[80%] flex flex-col items-center sm:grid sm:grid-cols-[2fr_1fr_1fr] gap-5 my-5 ">
        {/* logo */}
        <Link to="/" className="flex flex-col items-center sm:items-start ml-5">
          <img src={logo} alt="Logo" className="w-32" />
          <p className="w-[80%] text-sm sm:text-base sm:w-[80%] ">
            TruCommerce is Trusted party to get your truly wanted things for
            youself of your loved ones.
          </p>
        </Link>

        {/* links */}
        <div className="flex flex-col items-center sm:items-start gap-1 text-gray-300 font-medium tracking-wide">
          {Links.map((link) => {
            return (
              <Link
                key={link.title}
                to={link.href}
                className="hover:text-gray-100 transition-colors ease-in-out"
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        {/* socials */}
        <div className="flex flex-col gap-1 text-gray-300 font-medium tracking-wide items-center sm:items-start">
          {SocialLinks.map((link) => {
            return (
              <Link
                key={link.title}
                to={link.href}
                className="hover:text-gray-100 transition-colors ease-in-out"
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
      <Separator />
      <h1 className="text-sm sm:text-base md:text-lg mb-5 ">
        Copyright &#169; 2025 TruCommerce | All rights reserved.
      </h1>
    </div>
  );
};

export default Footer;
