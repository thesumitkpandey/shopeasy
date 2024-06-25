import { FaStar, FaStarHalf } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
export default function Ratings({ rating }) {
  return (
    <>
      <span>
        {rating >= 1 ? <FaStar /> : rating >= 0.5 ? <FaStarHalf /> : <CiStar />}
      </span>
      <span>
        {rating >= 2 ? <FaStar /> : rating >= 1.5 ? <FaStarHalf /> : <CiStar />}
      </span>
      <span>
        {rating >= 3 ? <FaStar /> : rating >= 2.5 ? <FaStarHalf /> : <CiStar />}
      </span>
      <span>
        {rating >= 4 ? <FaStar /> : rating >= 3.5 ? <FaStarHalf /> : <CiStar />}
      </span>
      <span>
        {rating >= 5 ? <FaStar /> : rating >= 4.5 ? <FaStarHalf /> : <CiStar />}
      </span>
    </>
  );
}
