"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Patner from "./patner";
import GetAll from "./getAll";

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
        <h1 className="text-6xl font-medium mb-6 drop-shadow-md">
          EventyCms.net
        </h1>

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Cari idEvent..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 pl-10 pr-4 rounded-xl shadow-lg border border-[#440806] focus:border-blue-500 focus:ring-2 focus:ring-[#ff6b35] outline-none transition duration-200 placeholder-[#fe4711]] text-gray-800"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            🔍
          </span>
        </div>
      </div>

      <Patner />
      <GetAll />
    </div>
  );
}
