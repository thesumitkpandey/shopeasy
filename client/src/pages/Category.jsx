import { useLoaderData, useLocation } from "react-router-dom";
import CarouselComponent from "../components/products/CarouselComponent";
import { newCategories } from "../utils/categories";
import CategoryBanner from "../components/products/CategoryBanner";
import ProductList from "../components/products/Products";

export default function Category() {
  const products = useLoaderData();
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
      case "grocery":
        return newCategories.find((el) => el.name === "Grocery").carouselItems;
      default:
        return null;
    }
  }
  const category = handleCategory();
  return (
    <>
      <CarouselComponent carouselContent={category} />
      <CategoryBanner
        category={
          pathname.substring(1).charAt(0).toUpperCase() +
          pathname.substring(1).slice(1)
        }
        products={products}
      />
      <ProductList
        products={products.filter(
          (p) => p.category.toLowerCase() == pathname.substring(1)
        )}
      />
    </>
  );
}
