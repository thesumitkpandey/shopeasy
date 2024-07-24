import { useParams } from "react-router-dom";
import PopUp from "../components/popup/PopUp";

export default function Category() {
  const { category } = useParams();

  return <PopUp message="Hello wolrd" status="success" />;
}
