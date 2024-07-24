import React from "react";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function Social() {
  return (
    <div className="flex space-x-4 mb-4 md:mb-0">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook className="text-2xl text-blue-600 transition-transform duration-200 ease-in-out hover:scale-110" />
      </a>
      <a
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTwitter className="text-2xl text-blue-400 transition-transform duration-200 ease-in-out hover:scale-110" />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className="text-2xl text-pink-600 transition-transform duration-200 ease-in-out hover:scale-110" />
      </a>
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin className="text-2xl text-blue-700 transition-transform duration-200 ease-in-out hover:scale-110" />
      </a>
      <a
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube className="text-2xl text-red-600 transition-transform duration-200 ease-in-out hover:scale-110" />
      </a>
    </div>
  );
}
