"use client";

import { IImageAndSequence } from "@/api/interfaces";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TheaterSequence from "@/components/theater/TheaterSequence";

const Page = ({ searchParams }) => {
  const { res } = searchParams;
  const sequencesAndImages = JSON.parse(res) as IImageAndSequence[];

  return (
    <section className="py-8">
      <Swiper
        slidesPerView={1}
        centeredSlides
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {sequencesAndImages.map((seqimg) => (
          <SwiperSlide key={seqimg.sequence} className="flex flex-col gap-5 ">
            <TheaterSequence seqimg={seqimg} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Page;
