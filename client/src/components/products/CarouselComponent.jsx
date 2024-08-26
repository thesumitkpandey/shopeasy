import { Carousel } from "flowbite-react";

export default function CarouselComponent({ carouselContent }) {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 my-4">
      <Carousel>
        {carouselContent.map((item, index) => (
          <img src={item.image} key={index} />
        ))}
      </Carousel>
    </div>
  );
}
