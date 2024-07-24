import { Link } from "react-router-dom";
export default function LinkItems({ name }) {
  return (
    <Link
      to={`${name}`}
      className=" transition-colors duration-200 ease-in-out hover:text-blue-600"
    >
      {name}
    </Link>
  );
}
