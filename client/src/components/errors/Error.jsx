import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Error404() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-myYellow rounded-full flex items-center justify-center text-white text-6xl">
            <FaHome />
          </div>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 animate-pulse">
          404
        </h1>
        <p className="text-2xl font-semibold mb-4">Oops! Page Not Found</p>
        <p className="text-lg mb-6">
          The page you are looking for might have been moved or deleted.
        </p>
        <p className="text-gray-600 mb-6">Redirecting you to Homepage...</p>
        <p className="text-gray-500">
          If you are not redirected,{" "}
          <a href="/" className="text-blue-600 underline">
            click here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
