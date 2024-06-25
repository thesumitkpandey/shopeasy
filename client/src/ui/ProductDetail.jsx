import React from "react";
import { useParams } from "react-router-dom";
import fake from "../features/products/fake";
export default function ProductDetail() {
  const { id } = useParams();
  const productDetails = fake.filter((el) => el.id == id);

  return <div>this is {id}</div>;
}
