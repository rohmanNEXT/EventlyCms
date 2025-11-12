"use client";

import React from "react";
import {
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CImage,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

const CarauselImg: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden" id="Home">
      {/* Overlay blur & text */}
      <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-20  bg-[#80cff9]/10">
        <div className="text-[#0a2e47] drop-shadow-lg px-4 sm:px-6 md:px-12">
          {/* Judul utama */}
          <div className="text-4xl sm:text-6xl md:text-8xl font-light mb-6 sm:mb-8">
            Yayasan Mangrove Lestari
          </div>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">
            Delta Mahakam,{" "}
            <span className="text-[#421a06]">
              Muara Badak dan sekitarnya
            </span>
          </p>
        </div>
      </div>

      {/* Carousel */}
      <CCarousel
        controls
        indicators
        transition="crossfade"
        interval={3000}
        className="h-full w-full"
      >
        {/* Slide 1 */}
        <CCarouselItem className="h-screen w-screen">
          <CImage
            src="/images/slice_1.png"
            alt="Slide 1"
            className="h-screen w-screen object-cover"
          />
       <CCarouselCaption className="hidden sm:block">
  <div className="mx-auto max-w-md md:max-w-md lg:max-w-md text-center text-[#0a2e47] dark:text-[#f0f9ff] backdrop-blur-sm bg-[#80cff9]/30 rounded-xl p-4">
    <h5 className="font-bold text-lg sm:text-xl md:text-2xl">
      Kegiatan buang sampah
    </h5>
    <p className="font-medium mt-2 text-[#0a2e47]/90 dark:text-[#f0f9ff]/90">
      19 / 03 / 2025
    </p>
  </div>
</CCarouselCaption>

        </CCarouselItem>

        {/* Slide 2 */}
        <CCarouselItem className="h-screen w-screen">
          <CImage
            src="/images/slice_2.png"
            alt="Slide 2"
            className="h-screen w-screen object-cover"
          />
         <CCarouselCaption className="hidden sm:block">
  <div className="mx-auto max-w-md md:max-w-md lg:max-w-md text-center text-[#0a2e47] dark:text-[#f0f9ff] backdrop-blur-sm bg-[#80cff9]/30 rounded-xl p-4">
    <h5 className="font-bold text-lg sm:text-xl md:text-2xl">
      Bantu dusun dan rt 
    </h5>
    <p className="font-medium mt-2 text-[#0a2e47]/90 dark:text-[#f0f9ff]/90">
      19 / 03 / 2025
    </p>
  </div>
</CCarouselCaption>
        </CCarouselItem>

        {/* Slide 3 */}
        <CCarouselItem className="h-screen w-screen">
          <CImage
            src="/images/slice_3.png"
            alt="Slide 3"
            className="h-screen w-screen object-cover"
          /> 
       <CCarouselCaption className="hidden sm:block">
  <div className="mx-auto max-w-md md:max-w-md lg:max-w-md text-center text-[#0a2e47] dark:text-[#f0f9ff] backdrop-blur-sm bg-[#80cff9]/30 rounded-xl p-4">
    <h5 className="font-bold text-lg sm:text-xl md:text-2xl">
      Mancing ikan
    </h5>
    <p className="font-medium mt-2 text-[#0a2e47]/90 dark:text-[#f0f9ff]/90">
      19 / 03 / 2025
    </p>
  </div>
</CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
    </div>
  );
};

export default CarauselImg;
