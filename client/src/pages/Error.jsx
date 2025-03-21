import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">
          Oops! Page Not Found
        </p>
        <p className="text-lg text-gray-500 mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-charcoal hover:scale-110 duration-500 rounded-lg shadow-md transition-all "
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
