"use client";
import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const socials = [
  { icon: <FaTwitter size={16} />,   href: "#", label: "Twitter" },
  { icon: <FaInstagram size={16} />, href: "#", label: "Instagram" },
  { icon: <FaLinkedin size={16} />,  href: "#", label: "LinkedIn" },
];

const Footer: React.FC = () => {

  return (
    <footer className="w-full border-t border-neutral-400/40 bg-white/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-8">
          {/* Logo + tagline */}
          <div>
            <div className="text-xl font-semibold bg-gradient-to-br from-[#FF6B2C] to-[#E85A1A] bg-clip-text text-transparent mb-4 md:mb-1">Evently</div>
            <p className="text-xs text-neutral-400 max-w-[200px] mx-auto md:mx-0">
              Discover events that matter to you.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            {/* Links could go here */}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-50 text-orange-400 border border-orange-400/40 hover:bg-orange-500 hover:text-white transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Evently. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400">
            Built with Next.js · Contentful · Umami
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
