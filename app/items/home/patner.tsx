"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaApple, FaGoogle, FaMicrosoft, FaAmazon, FaFacebook } from "react-icons/fa";

const partners = [
  { name: "Apple", icon: <FaApple size={24} /> },
  { name: "Google", icon: <FaGoogle size={24} /> },
  { name: "Microsoft", icon: <FaMicrosoft size={24} /> },
  { name: "Amazon", icon: <FaAmazon size={24} /> },
  { name: "Meta", icon: <FaFacebook size={24} /> },
];

const Patner: React.FC = () => {
  const repeatedPartners = [...partners, ...partners]; // loop supaya animasi smooth

  return (
    <div className="relative py-20 overflow-hidden px-6 sm:px-10 md:px-24 lg:px-40 border border-[#ffc7a8]">
      {/* Blur kiri & kanan responsif */}
      <div className="absolute top-0 left-0 sm:left-10 md:left-24 lg:left-40 w-16 sm:w-24 md:w-32 h-full bg-linear-to-r from-[#ffe5d4] to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 sm:right-10 md:right-24 lg:right-40 w-16 sm:w-24 md:w-32 h-full bg-linear-to-l from-[#ffe5d4] to-transparent pointer-events-none z-20" />

      {/* Judul */}
      <div className="text-lg sm:text-xl font-medium text-center pb-10 z-10 relative">
 Main Sponsor
      </div>

      {/* Animasi partner berjalan */}
      <div className="overflow-hidden relative">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {[...repeatedPartners, ...repeatedPartners].map((partner, index) => (
            <Card
              key={index}
              className="min-w-[90px] sm:min-w-[120px] h-16 sm:h-20 flex flex-col items-center justify-center border mx-2 sm:mx-3 rounded-2 bg-[#ffc7a8] backdrop-blur-md border-[#fe4711]"
            >
              <CardContent className="flex flex-col items-center justify-center w-full h-full p-0">
                <div className="text-center text-xl sm:text-2xl mb-1">{partner.icon}</div>
                <span className="text-center font-semibold text-sm sm:text-base">
                  {partner.name}
                </span>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Patner;
