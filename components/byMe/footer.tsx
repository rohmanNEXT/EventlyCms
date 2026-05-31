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
    <footer className="w-full border-t border-neutral-950/80 bg-white/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-8">
          {/* Logo + tagline */}
          <div>
            <div className="text-xl font-semibold text-orange-800 mb-4 md:mb-1">Evently</div>

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
                className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-50 text-orange-800 border border-orange-650/80 hover:bg-orange-800 hover:text-white transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-3 pt-3 flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Evently. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600">
            Built with Next.js · Contentful · Umami
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
