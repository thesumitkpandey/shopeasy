//REPLACE ALL A TAGS AND USE LINK AND CHAGE THE STRUCTURE TAILIWND ONLY
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
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
          </div>

          <div className="flex flex-col space-y-2 mb-4 md:mb-0">
            <a
              href="/about"
              className="text-gray-600 transition-colors duration-200 ease-in-out hover:text-gray-900"
            >
              About Us
            </a>
            <a
              href="/services"
              className="text-gray-600 transition-colors duration-200 ease-in-out hover:text-gray-900"
            >
              Services
            </a>
            <a
              href="/contact"
              className="text-gray-600 transition-colors duration-200 ease-in-out hover:text-gray-900"
            >
              Contact
            </a>
          </div>

          <div className="text-gray-600">
            <p>Email: contact@shopeasy.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 ShopEasy St, Commerce City, CO</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
