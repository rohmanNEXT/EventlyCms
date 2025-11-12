"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { CButton } from "@coreui/react";
// import router from "next/router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

    return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#440806]/20 backdrop-blur-md border-b border-[#e1f1fd]/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-20 py-5">
        {/* Logo */}
        <div
          onClick={()=>{router.push("/items/home")}}
          className="text-2xl sm:text-3xl font-light cursor-pointer tracking-tight px-0"
        >
          EventyCms.net
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-10 text-lg font-light">
          <button onClick={()=>{router.push("/items/home")}} className="hover:text-[#9d190f] transition">
            Home
          </button>
          <button onClick={()=>{router.push("/items/serp")}} className="hover:text-[#9d190f] transition">
            SERP
          </button>
            <button onClick={()=>{router.push("/items/contact")}} className="hover:text-[#9d190f] transition">
        Contact us
          </button>
        </div>

        {/* Tombol Google Map */}
        <div className="hidden md:block">
          <CButton
            color="light"
            variant="outline"
            className="border border-[#440806] rounded-full px-4 py-1 ml-9 hover:bg-[#ffa071] hover:text-[#0a2e47] transition"
          >
      Office Map →
          </CButton>
        </div>

        {/* Tombol Menu (Mobile) */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {open && (
        <div className="md:hidden flex flex-col items-center bg-[#0a2e47]/10 backdrop-blur-md border-t border-[#e1f1fd]/10 py-4 space-y-4 text-lg">
          <button
           onClick={()=>{router.push("/items/home")}} 
            className="w-full text-center py-2 hover:bg-[#1a4566]/40 transition"
          >
            Home
          </button>
          <button
           onClick={()=>{router.push("/items/serp")}} 
            className="w-full text-center py-2 hover:bg-[#1a4566]/40 transition"
          >
            SERP
          </button>
          <button
           onClick={()=>{router.push("/items/contact")}} 
            className="w-full text-center py-2 hover:bg-[#1a4566]/40 transition"
          >
            Contact us
          </button> 
          <CButton
          
            variant="outline"
            className="border border-[#440806] rounded-full px-4 py-2 mt-1 hover:bg-[#ffa071] hover:text-[#0a2e47] transition"
          >
            Google Map →
          </CButton>
        </div>
      )}
    </nav>
  );
}
