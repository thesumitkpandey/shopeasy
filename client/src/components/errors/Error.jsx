import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center  text-blue-500">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4 text-red-900">404 Not Found</h1>
        <p className="text-green-500 mb-4">Redirecting you to Homepage ...</p>
      </div>
    </div>
  );
}
