"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAllEvents, resolveAssetUrl } from "../../../lib/contentful";
import { Event, ContentfulLink, ContentfulResponse } from "../../../lib/type";
import {
  MapPin,
  Tag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Markdown from "react-markdown";
import { SkeletonEventCard, SkeletonHeader, SkeletonPagination, SkeletonText } from "@/components/byMe/SkeletonCard";

interface EventFields {
  title?: string;
  country?: string;
  location?: string | { lat: number; lon: number };
  description?: string;
  category?: string;
  image?: ContentfulLink | ContentfulLink[];
  images?: ContentfulLink | ContentfulLink[];
}

import { motion, AnimatePresence } from "framer-motion";

const GetAll: React.FC = () => {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<{ [key: string]: number }>({});
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res: ContentfulResponse<EventFields> = await getAllEvents<EventFields>();
        const formatted: Event[] = res.items.map((item) => {
          const loc = item.fields.location;
          const images: string[] = [];

          if (item.fields.image) {
            const arr = Array.isArray(item.fields.image)
              ? item.fields.image
              : [item.fields.image];
            arr.forEach((ref) => {
              const url = resolveAssetUrl(ref, res.includes?.Asset || []);
              if (url) images.push(url);
            });
          }

          if (item.fields.images) {
            const arr = Array.isArray(item.fields.images)
              ? item.fields.images
              : [item.fields.images];
            arr.forEach((ref) => {
              const url = resolveAssetUrl(ref, res.includes?.Asset || []);
              if (url) images.push(url);
            });
          }

          return {
            id: item.sys.id,
            title: item.fields.title || "Untitled",
            country: item.fields.country || "",
            location:
              typeof loc === "string"
                ? loc
                : loc && typeof loc === "object" && "lat" in loc
                  ? `${loc.lat}, ${loc.lon}`
                  : "",
            description: item.fields.description || "",
            category: item.fields.category || "",
            image: images.length > 0 ? images[0] : "",
            images: images,
          };
        });

        setEvents(formatted);
      } catch (err) {
        console.error("Failed to fetch events", err);
        setError(true);
      } finally {
        // Enforce same delay as page for "rapi" transition
        setTimeout(() => setLoading(false), 400);
      }
    };

    fetchData();
  }, []);

  const categories = useMemo(() => {
    return Array.from(
      new Set(events.map((e) => e.category).filter(Boolean)),
    ) as string[];
  }, [events]);

  const filtered = useMemo(() => {
    if (!activeCategory) return events;
    return events.filter((e) => e.category === activeCategory);
  }, [events, activeCategory]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleCategory = (cat: string | null) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section className="w-full py-16 mt-4">
      {/* Page Header - Always Visible */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <div className="text-base font-semibold text-neutral-800 tracking-tight mb-3 sm:mb-0">
            All Events
          </div>
        </div>

        {loading ? (
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4 sm:mb-0">
            <SkeletonHeader />
            <SkeletonHeader />
            <SkeletonHeader />
          </div>
        ) : categories.length > 0 && (
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4 sm:mb-0">
            <button
              onClick={() => handleCategory(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                activeCategory === null
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-orange-50 text-neutral-600 hover:bg-orange-100 border border-orange-400/60"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-orange-50 text-neutral-600 hover:bg-orange-100 border border-orange-400/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Results Container */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <SkeletonEventCard key={i} />
                ))}
              </div>
              <SkeletonPagination />
              <div className="flex justify-center mt-12">
                <SkeletonText className="h-4 w-40" />
              </div>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full py-20 text-center bg-white rounded-3xl border border-orange-400/60"
            >
              <p className="text-sm text-neutral-500">Could not load events.</p>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {currentItems.length === 0 ? (
                <div className="text-center py-20 text-neutral-400 border border-neutral-200 rounded-3xl h-auto sm:h-auto lg:h-[1260px]">
                  <p className="text-4xl mb-3">🎪</p>
                  <p>No events found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-auto sm:h-auto lg:h-[1260px]">
                {currentItems.map((event) => {
                  const images = event.images || [];
                  const idx = currentIdx[event.id] || 0;

                  return (
                    <div
                      key={event.id}
                      className="bg-white/65 backdrop-blur-2xl border border-[rgba(255,107,44,0.12)] rounded-[1.25rem] shadow-[0_4px_24px_rgba(255,107,44,0.07),0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-250 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,107,44,0.15),0_4px_12px_rgba(0,0,0,0.07)] flex flex-col overflow-hidden cursor-pointer group h-[400px]"
                      onClick={() => router.push(`/items/explore/${event.id}`)}
                    >
                      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl group/slider">
                        {images.length > 0 ? (
                          <>
                            <Image
                              src={images[idx]}
                              alt={event.title}
                              width={400}
                              height={224}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {images.length > 1 && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIdx((prev) => ({
                                      ...prev,
                                      [event.id]: (idx - 1 + images.length) % images.length,
                                    }));
                                  }}
                                  className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-neutral-800 backdrop-blur-md transition-all shadow-md opacity-0 group-hover/slider:opacity-100 z-10"
                                >
                                  <ArrowLeft size={14} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIdx((prev) => ({
                                      ...prev,
                                      [event.id]: (idx + 1) % images.length,
                                    }));
                                  }}
                                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-neutral-800 backdrop-blur-md transition-all shadow-md opacity-0 group-hover/slider:opacity-100 z-10"
                                >
                                  <ArrowRight size={14} />
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                             <span className="text-neutral-400 text-4xl">E</span>
                          </div>
                        )}

                        {event.category && (
                          <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium text-orange-600 border border-orange-400/60 z-10">
                            <Tag size={10} />
                            {event.category}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col flex-1 p-4 gap-2">
                        <h2 className="h-6 font-semibold text-sm text-neutral-800 line-clamp-2 leading-snug">
                          {event.title}
                        </h2>

                        <div className="h-4 flex items-center gap-1 text-xs text-neutral-400">
                           <MapPin size={11} className="text-orange-400 shrink-0" />
                          <span className="truncate">
                            {[event.location, event.country].filter(Boolean).join(", ")}
                          </span>
                        </div>

                        <div className="h-9 text-xs text-neutral-500 overflow-hidden line-clamp-2 leading-relaxed mt-1">
                          {event.description ? (
                            <Markdown>{event.description}</Markdown>
                          ) : (
                            "\u00A0"
                          )}
                        </div>

                        <button className="mt-auto pt-3 flex items-center gap-1 text-xs font-semibold text-orange-600">
                          View Details <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-orange-400/60 text-neutral-500 disabled:opacity-30"
                >
                  <ChevronLeft size={15} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-xl text-sm ${
                      currentPage === i + 1
                        ? "bg-orange-500 text-white shadow-sm shadow-orange-300/40"
                        : "border border-orange-400/60 text-neutral-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-orange-400/60 text-neutral-500 disabled:opacity-30"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            )}

            {filtered.length > 0 && (
              <p className="text-center text-[11px] md:text-xs text-neutral-400 font-medium mt-12">
                Showing {startIndex + 1}–
                {Math.min(startIndex + itemsPerPage, filtered.length)} of{" "}
                {filtered.length}
              </p>
            )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GetAll;
