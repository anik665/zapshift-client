import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import BannerImg1 from "../../../assets/banner/banner1.png";
import BannerImg2 from "../../../assets/banner/banner2.png";
import BannerImg3 from "../../../assets/banner/banner3.png";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";

const Banner = () => {
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div className="relative">
          <img src={BannerImg1} />
          <div className="  absolute bottom-5 left-20  ">
            <div className=" flex gap-2">
              <button className="bg-primary shadow-sm font-bold text-[20px]   px-4 py-2 rounded-2xl mr-2">
                Be track Your order
              </button>
              <button className=" bg-black text-white text-xl -ms-4 font-bold flex items-center justify-center rounded-full w-11 h-11  ">
                <MdArrowOutward />
              </button>
              <button className=" bg-white text-[20px] font-bold px-4 py-2 rounded-xl">
                Be a rider
              </button>
            </div>
          </div>
        </div>
        <div>
          <img src={BannerImg2} />
          <div className="  absolute bottom-10 left-20  ">
            <div className=" flex gap-2">
              <button className="bg-primary shadow-sm font-bold text-[20px]   px-4 py-2 rounded-2xl mr-2">
                Be track Your order
              </button>
              <button className=" bg-black text-white text-xl -ms-4 font-bold flex items-center justify-center rounded-full w-11 h-11  ">
                <MdArrowOutward />
              </button>
              <button className=" bg-white text-[20px] font-bold px-4 py-2 rounded-xl">
                Be a rider
              </button>
            </div>
          </div>
        </div>
        <div>
          <img src={BannerImg3} />
          <div className="  absolute bottom-10 left-20  ">
            <div className=" flex gap-2">
              <button className="bg-primary shadow-sm font-bold text-[20px]   px-4 py-2 rounded-2xl mr-2">
                Be track Your order
              </button>
              <button className=" bg-black text-white text-xl -ms-4 font-bold flex items-center justify-center rounded-full w-11 h-11  ">
                <MdArrowOutward />
              </button>
              <button className=" bg-white text-[20px] font-bold px-4 py-2 rounded-xl">
                Be a rider
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
