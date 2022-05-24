import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"

// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper';
import { useSelector } from "react-redux";
import { isEmpty } from "../utils/Utils";

// install Swiper modules
SwiperCore.use([Pagination]);

export default function ReviewCarousel() {
  const reviews = useSelector(state => state.reviews)
  useEffect(()=>{
    console.log(reviews)
  })
  return (
    <div className="px-5 py-10">
      <Swiper 
        slidesPerView={3} 
        spaceBetween={30} 
        freeMode={true}
        slidesPerGroup={1} loop={true} loopFillGroupWithBlank={true}
        breakpoints={{
        "320": {
          "slidesPerView": 1,
          "spaceBetween": 10
        },
        "690": {
          "slidesPerView": 2,
          "spaceBetween": 20
        },
        "1024": {
          "slidesPerView": 3,
          "spaceBetween": 30
        },
        "1536": {
          "slidesPerView": 4,
          "spaceBetween": 40
        }
        }} 
        className="mySwiper">
        { !isEmpty(reviews) &&
          reviews.map(review => (
            <SwiperSlide key={review.id}>
              <div className="shadow-lg rounded-lg border border-gray-300 p-4 my-5 cursor-pointer">

                <div className="flex gap-1">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img className="object-contain" src={review.img} alt="review-img" />
                  </div>
                  <div className="flex-1 px-3">
                    <h3 className="text-left font-bold text-primary">{review.name}</h3>
                    <ReactStars
                      className=""
                      count={5}
                      value={review.rate}
                      size={30}
                      activeColor="#ffd700"
                    />
                  </div>
                  <FormatQuoteIcon className="text-6xl text-gray-300 justify-self-end"/>
                </div>

                <div className="text-left">
                  {review.testimonial}
                </div>
              </div>
            </SwiperSlide>
          ))
        }
        
      </Swiper>
    </div>
  )
}
