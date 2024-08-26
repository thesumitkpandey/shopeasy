import { useLocation } from "react-router-dom";
import CarouselComponent from "../components/products/CarouselComponent";
import { newCategories } from "../utils/categories";

export default function Category() {
  const { pathname } = useLocation();

  function handleCategory() {
    switch (pathname.substring(1)) {
      case "men":
        return newCategories.find((el) => el.name === "Men").carouselItems;
      case "women":
        return newCategories.find((el) => el.name === "Women").carouselItems;
      case "kids":
        return newCategories.find((el) => el.name === "Kids").carouselItems;
      case "electronics":
        return newCategories.find((el) => el.name === "Electronics")
          .carouselItems;
      case "furniture":
        return newCategories.find((el) => el.name === "Furniture")
          .carouselItems;
      case "groceries":
        return newCategories.find((el) => el.name === "Groceries")
          .carouselItems;
      default:
        return null;
    }
  }

  const category = handleCategory();

  return (
    <>
      {category ? (
        <CarouselComponent carouselContent={category} />
      ) : (
        <div>No content available</div>
      )}
    </>
  );
}
