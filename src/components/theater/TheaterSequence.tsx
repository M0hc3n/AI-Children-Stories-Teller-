"use client";

import { IImageAndSequence } from "@/api/interfaces";
import { Button, Image } from "@nextui-org/react";
import React, { useState } from "react";

import Typewriter from "typewriter-effect";

import { useSwiper, useSwiperSlide } from "swiper/react";
import Next from "../icons/Next";
import { useRouter } from "next/navigation";

const TheaterSequence = ({ seqimg }: { seqimg: IImageAndSequence }) => {
  const router = useRouter();
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();
  const [hasFinishedTyping, setHasFinishedTyping] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8">
      <Image
        src={seqimg.image}
        alt="theater image"
        className={`h-[600px] object-cover w-fit mx-auto ${
          swiperSlide.isActive && "animated-img"
        }`}
      />

      {swiperSlide.isActive && (
        <p className="text-lg font-bold text-center px-10">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .changeDelay(50)
                .typeString(`${seqimg.sequence}.`)
                .start()
                .callFunction(() => {
                  setHasFinishedTyping(true);
                });
            }}
          />
        </p>
      )}

      {swiperSlide.isActive && hasFinishedTyping && (
        <div className="mx-auto pb-4">
          <Button
            className="mx-auto"
            color="primary"
            variant="solid"
            endContent={<Next />}
            onClick={() => {
              if (swiper.isEnd) {
                router.push("/");
              } else {
                swiper.slideNext();
              }
            }}
          >
            {swiper.isEnd ? "Back to Home" : "Next Frame"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TheaterSequence;
