import { useSelector } from "react-redux";
import Dashboard from "./admin/Dashboard";
import CarouselComponent from "../components/products/CarouselComponent";
import CategoryBanner from "../components/products/CategoryBanner";
import { useLoaderData, useParams } from "react-router-dom";
import { newCategories } from "../utils/categories";

const carouselItems = [
  {
    image:
      "https://assets.tatacliq.com/medias/sys_master/images/61699652288542.jpg",
    link: "",
  },
  {
    image:
      "https://assets.tatacliq.com/medias/sys_master/images/61699652288542.jpg",
    link: "",
  },
  {
    image:
      "https://assets.tatacliq.com/medias/sys_master/images/61699652091934.jpg",
    link: "",
  },
  {
    image:
      "https://assets.tatacliq.com/medias/sys_master/images/61750973431838.jpg",
    link: "",
  },
  {
    image:
      "https://assets.tatacliq.com/medias/sys_master/images/61699652157470.jpg",
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
