import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center space-x-4 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage == 1}
        className={`flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <GrFormPrevious size={20} />
        <span>Previous</span>
      </button>

      <h2 className="text-lg font-medium">
        Page {currentPage} of {totalPages}
      </h2>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage == totalPages}
        className={`flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <span>Next</span>
        <GrFormNext size={20} />
      </button>
    </div>
  );
}
