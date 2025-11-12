"use client";

import React from "react";
import { Poppins } from "next/font/google";
import { MdEmail } from "react-icons/md";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

const Footer: React.FC = () => {
  return (
    <footer className={`${poppins.className} w-full border-t border-[#fe4711] py-6 text-[#0a2e47]`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Logo / Text kiri */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-2xl md:text-3xl font-medium tracking-tight mb-4 md:mb-0">
            EventlyCms.net
          </div>

          {/* Email icon kanan */}
          <div className="flex items-center gap-2">
            <MdEmail size={24} />
            <span className="text-sm md:text-base">info@eventlycms.net</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-xs md:text-sm font-sans font-medium">
          Copyright ©2025 Custom template Of EventyCms.net | Semua info dilindungi hukum dan hak kepemilikan.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
