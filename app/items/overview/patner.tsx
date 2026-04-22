"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaApple,
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaFacebook,
  FaStripe,
  FaSlack,
} from "react-icons/fa";
import { SiVercel } from "react-icons/si";
import { SkeletonPartner } from "@/components/byMe/SkeletonCard";

const partners = [
  { name: "Apple", icon: <FaApple size={22} /> },
  { name: "Google", icon: <FaGoogle size={22} /> },
  { name: "Microsoft", icon: <FaMicrosoft size={22} /> },
  { name: "Amazon", icon: <FaAmazon size={22} /> },
  { name: "Meta", icon: <FaFacebook size={22} /> },
  { name: "Stripe", icon: <FaStripe size={22} /> },
  { name: "Vercel", icon: <SiVercel size={22} /> },
  { name: "Slack", icon: <FaSlack size={22} /> },
];

interface PatnerSliderProps {
  loading?: boolean;
}

const PatnerSlider: React.FC<PatnerSliderProps> = ({ loading }) => {
  const items = [...partners, ...partners, ...partners, ...partners];

  if (loading) {
    return (
      <section className="relative py-8 mb-20 overflow-hidden border-y border-neutral-400/40">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-8">
          Main Sponsors
        </p>
        <div className="flex justify-center overflow-hidden">
          <div className="flex gap-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonPartner key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="relative py-8 mb-20 overflow-hidden border-y border-neutral-400/40">
      {/* Fade edges */}
      <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#FFFAF7] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#FFFAF7] to-transparent z-10 pointer-events-none" />

      <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-8">
        Main Sponsors
      </p>

      <div className="overflow-hidden">
        <motion.div 
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 28,
              ease: "linear",
            },
          }}
        >
          {items.map((partner, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 mx-5 px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-orange-400/60 shadow-sm shadow-orange-50/40 min-w-[96px] hover:shadow-md hover:border-orange-400/60 transition-all duration-200"
            >
              <span className="text-neutral-500 group-hover:text-orange-600 transition">
                {partner.icon}
              </span>
              <span className="text-xs font-medium text-neutral-400">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PatnerSlider;
