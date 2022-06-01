// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay } from "swiper";
// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);

import { useSelector } from "react-redux";
import { isEmpty } from "../utils/Utils";
import ChallengerMenu from "./menu";

export default function Carousel() {
  const slides = useSelector((state) => state.slides);
  return (
      <div className="h-full flex items-center justify-center container-wrapper">
        <Swiper
          className="mySwiper"
          loop={true}
          pagination={{ dynamicBullets: true, clickable: true }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
        >
          {!isEmpty(slides) && slides?.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex items-center gap-3 md:flex-col md:text-center">
                <div className="space-y-5 md:space-y-4">
                  {/* <span className="text-3xl md:text-xl text-secondary">
                    Our Specil Dish
                  </span> */}
                  <h2 className="text-5xl md:text-3xl font-black text-primary">
                    {slide.title}
                  </h2>
                  <p className="text-2xl md:text-lg text-gray-500">
                  {slide.description}
                  </p>
                  {/* <MyButton text="Order Now" /> */}
                </div>
                <div className="h-full md:pb-10">
                  <img
                    className="md:max-h-[250px]"
                    src={slide.image}
                    alt="slide-img"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <ChallengerMenu/> */}
      </div>
  );
}
