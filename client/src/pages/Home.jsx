import { useSelector } from "react-redux";
import Dashboard from "./admin/Dashboard";
import CarouselComponent from "../components/products/CarouselComponent";
import CategoryBanner from "../components/products/CategoryBanner";
import { useLoaderData, useParams } from "react-router-dom";
import { newCategories } from "../utils/categories";
import fashion from "../assets/Homepage/fashion.jpg";
import shoes from "../assets/Homepage/shoes.jpg";
import watch from "../assets/Homepage/watch.jpg";
import gold from "../assets/Homepage/gold.jpg";
const carouselItems = [
  {
    image: watch,
    link: "",
  },
  {
    image: shoes,
    link: "",
  },
  {
    image: gold,
    link: "",
  },
  {
    image: watch,
    link: "",
  },
  {
    image: fashion,
    link: "",
  },
];

export default function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const products = useLoaderData();

  return (
    <div className="bg-gray-50">
      {userInfo && userInfo.isAdmin ? (
        <Dashboard />
      ) : (
        <>
          <CarouselComponent carouselContent={carouselItems} />
          {products &&
            newCategories.map((category) => (
              <CategoryBanner
                category={category.name}
                key={category.name}
                products={products}
              />
            ))}
        </>
      )}
    </div>
  );
}
