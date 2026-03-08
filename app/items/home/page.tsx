"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Patner from "./patner";
import GetAll from "./getAll";
import { FaSearch } from "react-icons/fa";

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim() !== "") router.push(`/items/serp?id=${query}`);
    }, 600);
    return () => clearTimeout(delay);
  }, [query, router]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen text-center bg-[#ffe5d4] px-4">
        <h1 className="text-2xl font-medium mb-8 drop-shadow-md">
          Eventy News
        </h1>

        <div className="relative w-full max-w-md mb-8 px-6">
          <input
            type="text"
            placeholder="Cari idEvent..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 px-2 pl-10 pr-4 rounded-full shadow-lg border border-[#440806] focus:border-blue-500 focus:ring-2 focus:ring-[#ff6b35] outline-none transition duration-200 placeholder-[#fe4711]] text-gray-800"
          />{" "}
          <FaSearch className="absolute left-10 top-1/2 -translate-y-1/2 text-orange-900" />
        </div>
      </div>

      <Patner />
      <GetAll />
    </div>
  );
}
