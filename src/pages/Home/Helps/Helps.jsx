import React from "react";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
import datas from "./helps.json";
import HelpsCards from "./HelpsCards";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Helps = () => {
  //   console.log(datas);
  const Brands = [casio, amazon, moonstar, star, start_people, randstad];
  return (
    <div className="py-20 text-center">
      <h3 className="text-secondary font-bold text-2xl">
        We've helped thousands of sales teams
      </h3>
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper my-10 "
      >
        {Brands.map((brand) => (
          <SwiperSlide>
            {" "}
            <img src={brand} alt="" className=" w-40 h-auto" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="flex items-center justify-center gap-4 my-8">
        <img src={casio} alt="" className="" />
        <img src={amazon} alt="" className="" />
        <img src={moonstar} alt="" className="" />
        <img src={star} alt="" className="" />
        <img src={start_people} alt="" className="" />
        <img src={randstad} alt="" className="" />
      </div> */}
      <div className=" border-dashed border-r-0 border-l-0 border-[#03464D] my-4  border w-full "></div>
      <div className="">
        {datas.map((data) => (
          <HelpsCards data={data} key={data.title} />
          //   <Card r={data} />
        ))}
      </div>
    </div>
  );
};

export default Helps;
