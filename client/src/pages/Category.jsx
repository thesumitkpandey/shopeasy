import { useParams } from "react-router-dom";
import PopUp from "../components/popup/PopUp";

export default function Category() {
  const { category } = useParams();

  return <>this is category page</>;
}
