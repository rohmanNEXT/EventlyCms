"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import PatnerSlider from "./patner";
import GetAll from "./getAll";
import { SkeletonSearch_2 } from "@/components/byMe/SkeletonCard";

const OverviewPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Set a slight delay so the skeleton is actually visible to the user
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim() !== "") router.push(`/items/explore?id=${query}`);
    }, 600);
    return () => clearTimeout(delay);
  }, [query, router]);

  return (
    <div>
      {/* Hero - Always Visible */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-white text-xs font-semibold text-neutral-700 border border-orange-400/60">
            Discover · Explore · Connect
          </span>

          <h1 className="text-4xl sm:text-5xl font-semibold text-orange-600 leading-tight">
            Discover Events
            <br />
            <span className="text-black">That Matter</span>
          </h1>

          <p className="mt-4 text-sm text-neutral-400">
            Curated events from around the world.
          </p>

          {/* Search Area */}
          <div className="mt-8 relative w-full min-h-[48px] flex items-center justify-center">
            {loading ? (
              <SkeletonSearch_2 />
            ) : (
              <div className="relative w-full max-w-sm">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  type="text"
                  placeholder="Search events…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-5 py-3 rounded-full bg-white text-sm text-neutral-800 border border-neutral-400/60 outline-none shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <PatnerSlider loading={loading} />

      {/* Event list - GetAll handles its own skeleton internally */}
      <GetAll />
    </div>
  );
};

export default OverviewPage;
