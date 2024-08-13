import { Link } from "react-router-dom";
export default function StepsItems({ name, stepRank, stepNumber }) {
  return (
    <>
      <Link
        to={stepRank ? `/${name.toLowerCase()}` : "#"}
        className="flex flex-col items-center"
      >
        <span
          className={`w-8 h-8 flex items-center justify-center text-white font-bold ${
            stepRank ? "bg-myYellow" : "bg-myGray"
          } rounded-full`}
        >
          {stepNumber}
        </span>
        <span className="mt-2 text-sm">{name}</span>
      </Link>
    </>
  );
}
