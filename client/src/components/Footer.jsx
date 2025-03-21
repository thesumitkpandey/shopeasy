import React from "react";
import {
  AiOutlineTwitter,
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-charcoal text-white">
      <div className="grid grid-cols-1 md:grid-cols-3  gap-8 px-8 py-10">
        {/* Left Column - Logo & Company Info */}
        <div className="">
          <img src={logo} alt="Company Logo" className="w-32 mb-3" />
          <p className="text-gray-400 text-sm">
            Your one-stop destination for the best products and deals. Shop with
            confidence and convenience.
          </p>
        </div>

        {/* Middle Column - Links */}
        <div className="text-center sm:text-left">
          <h1 className="text-lg font-semibold mb-2">Quick Links</h1>
          <ul className="text-gray-400 text-sm space-y-1">
            {/* Add links dynamically */}
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Corporate Information</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Column - More Links */}
        <div className="text-center sm:text-left">
          <h1 className="text-lg font-semibold mb-2">Support</h1>
          <ul className="text-gray-400 text-sm space-y-1">
            {/* Add links dynamically */}
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section - Social Icons & Payments */}
      <div className="border-t border-gray-700 px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
        <div className="flex space-x-4">
          <AiFillFacebook
            size={25}
            className="cursor-pointer hover:text-gray-200"
          />
          <AiOutlineTwitter
            size={25}
            className="cursor-pointer hover:text-gray-200"
          />
          <AiFillGithub
            size={25}
            className="cursor-pointer hover:text-gray-200"
          />
          <AiFillInstagram
            size={25}
            className="cursor-pointer hover:text-gray-200"
          />
        </div>

        <p className="text-center py-3 sm:py-0">
          © 2025 ShopEasy. All rights reserved.
        </p>

        <img
          src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
          alt="Payment Options"
          className="w-40"
        />
      </div>
    </div>
  );
};

export default Footer;
