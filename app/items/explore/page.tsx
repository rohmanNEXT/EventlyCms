"use client";
import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import { useRouter, useSearchParams } from "next/navigation";
import Markdown from "react-markdown";
import { getAllEvents, resolveAssetUrl } from "../../../lib/contentful";
import { Event } from "../../../lib/type";
import {
  Search,
  MapPin,
  Tag,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import {
  SkeletonSearch,
  SkeletonFilter,
  SkeletonText,
  SkeletonHeader,
  SkeletonEventCard,
  SkeletonPagination,
} from "@/components/byMe/SkeletonCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContentfulResponse, ContentfulLink } from "../../../lib/type";

interface EventFields {
  title?: string;
  country?: string;
  location?: string | { lat: number; lon: number };
  description?: string;
  category?: string;
  image?: ContentfulLink;
  images?: ContentfulLink[];
}

const ExplorePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams?.get("id") || "";

  const [events, setEvents] = useState<Event[]>([]);
  const [filtered, setFiltered] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [query, setQuery] = useState(urlQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(urlQuery);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const [sliderIndex, setSliderIndex] = useState<{ [key: string]: number }>({});

  const itemsPerPage = 9;



  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setDebouncedQuery(value), 500),
    [],
  );

  useEffect(() => {
    debouncedSetQuery(query);
    return () => debouncedSetQuery.cancel();
  }, [query, debouncedSetQuery]);

  useEffect(() => {
    const fetchAllData = async () => {
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
                : loc && typeof loc === "object" && 'lat' in loc
                  ? `${loc.lat}, ${loc.lon}`
                  : "",
            description: item.fields.description || "",
            category: item.fields.category || "",
            image: images.length > 0 ? images[0] : "",
            images: images,
          };
        });

        setEvents(formatted);
      } catch {
        setError(true);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    let result = events;

    if (debouncedQuery) {
      result = result.filter((e) =>
        e.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
      );
    }
    if (activeCategory) {
      result = result.filter((e) => e.category === activeCategory);
    }
    if (activeCountry) {
      result = result.filter((e) => e.country === activeCountry);
    }
    if (activeLocation) {
      result = result.filter((e) => e.location === activeLocation);
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [events, debouncedQuery, activeCategory, activeCountry, activeLocation]);

  const categories = Array.from(
    new Set(events.map((e) => e.category).filter(Boolean)),
  ) as string[];

  const countries = Array.from(
    new Set(events.map((e) => e.country).filter(Boolean)),
  ) as string[];

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);



  return (
    <div className="w-full relative min-h-screen pt-24 bg-[#FFFAF7] max-w-7xl mx-auto">
      <section className="pt-10 pb-12 border-b border-neutral-400/40 max-w-6xl mx-auto">
        <div className="max-w-4xl w-full mx-auto text-center flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-neutral-800 mb-6">
            Find Event
          </h1>

          {loading ? (
            <SkeletonSearch />
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
      </section>

      <section className="w-full mt-8 pb-20 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <aside className="w-full lg:w-[260px] shrink-0 flex flex-col sm:flex-row lg:flex-col gap-5 h-max">
          {loading ? (
             <>
               <SkeletonFilter />
               <SkeletonFilter />
             </>
          ) : (
            <>
              {categories.length > 0 && (
                <div className="group/filter flex-1 bg-white p-4 rounded-2xl border border-orange-400/40 shadow-sm flex flex-col">
                  <h3 className="flex items-center gap-2 text-[15px] font-semibold text-neutral-800 mb-3 pb-2.5 border-b border-orange-400/40 shrink-0">
                    <Tag size={15} className="text-orange-600" />
                    Categories
                  </h3>
                  <ScrollArea className="h-[200px] pr-2">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setActiveCategory(null)}
                        className={`text-left px-3 py-2 rounded-xl text-[13px] font-medium transition ${activeCategory === null
                          ? "bg-orange-500 text-white shadow-sm"
                          : "text-neutral-600 hover:bg-orange-50"
                          }`}
                      >
                        All Categories
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`text-left px-3 py-2 rounded-xl text-[13px] font-medium transition ${activeCategory === cat
                            ? "bg-orange-500 text-white shadow-sm"
                            : "text-neutral-600 hover:bg-orange-50"
                            }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {countries.length > 0 && (
                <div className="group/filter flex-1 bg-white p-4 rounded-2xl border border-orange-400/40 shadow-sm flex flex-col">
                  <h3 className="flex items-center gap-2 text-[15px] font-semibold text-neutral-800 mb-3 pb-2.5 border-b border-orange-400/40 shrink-0">
                    <MapPin size={15} className="text-orange-600" />
                    Locations
                  </h3>
                  <ScrollArea className="h-[300px] pr-2">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => {
                          setActiveCountry(null);
                          setActiveLocation(null);
                        }}
                        className={`text-left px-3 py-2 rounded-xl text-[13px] font-medium transition ${activeCountry === null
                          ? "bg-orange-500 text-white shadow-sm"
                          : "text-neutral-600 hover:bg-orange-50"
                          }`}
                      >
                        Anywhere
                      </button>

                      {countries.map((country) => {
                        const countryLocations = Array.from(
                          new Set(
                            events
                              .filter((e) => e.country === country)
                              .map((e) => e.location)
                              .filter(Boolean),
                          ),
                        ) as string[];
                        const isActiveCountry = activeCountry === country;

                        return (
                          <div key={country} className="flex flex-col gap-1">
                            <button
                              onClick={() => {
                                setActiveCountry(isActiveCountry ? null : country);
                                setActiveLocation(null);
                              }}
                              className={`text-left px-3 py-2 rounded-xl text-[13px] font-medium transition flex justify-between items-center ${isActiveCountry
                                ? "bg-orange-500 text-white shadow-sm"
                                : "text-neutral-600 hover:bg-orange-50"
                                }`}
                            >
                              <span>{country}</span>
                              {countryLocations.length > 0 && (
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${isActiveCountry ? "bg-white/20 text-white" : "bg-orange-100 text-orange-600"}`}
                                >
                                  {countryLocations.length}
                                </span>
                              )}
                            </button>

                            {isActiveCountry && countryLocations.length > 0 && (
                              <div className="flex flex-col gap-1 pl-4 mt-1 border-l-2 border-orange-400/40 ml-3 mb-1">
                                {countryLocations.map((loc) => {
                                  const isActiveLoc = activeLocation === loc;
                                  return (
                                    <button
                                      key={loc}
                                      onClick={() =>
                                        setActiveLocation(isActiveLoc ? null : loc)
                                      }
                                      className={`text-left px-3 py-1.5 rounded-lg text-[13px] font-medium transition ${isActiveLoc
                                        ? "bg-orange-100 text-orange-700"
                                        : "text-neutral-500 hover:text-orange-600 hover:bg-orange-50/50"
                                        }`}
                                    >
                                      {loc}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </>
          )}
        </aside>

        <main className="flex-1 flex flex-col w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 px-2 gap-3">
            {loading ? (
              <>
                <SkeletonText className="h-4 w-16 mt-1" />
                <SkeletonHeader />
              </>
            ) : !error && (
              <>
                 <div className="text-base md:text-lg font-semibold text-neutral-800">
                    Results
                  </div>
                <p className="w-fit text-[11px] md:text-xs px-3 py-1 bg-white text-neutral-700 rounded-full font-semibold uppercase tracking-wider border border-orange-400/40">
                  {filtered.length} visible{filtered.length !== 1 ? "s" : ""}
                </p>
              </>
            )}
          </div>

          <div className="flex-1 flex flex-col">
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonEventCard key={i} />
                ))}
              </div>
            )}

            {error && !loading && (
              <div className="w-full flex-1 flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-orange-400/40">
                <p className="text-3xl md:text-4xl mb-4">⚠️</p>
                <h3 className="text-base md:text-lg font-semibold text-neutral-800">
                  Something went wrong
                </h3>
                <p className="text-neutral-500 mt-2 text-sm">
                  Could not load events.
                </p>
              </div>
            )}

            {!loading &&
              !error &&
              events.length > 0 &&
              currentItems.length === 0 && (
                <div className="w-full flex-1 min-h-[350px] flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-orange-400/40">
                  <p className="text-4xl md:text-5xl mb-4 opacity-70">💨</p>
                  <h3 className="text-base md:text-lg font-semibold text-neutral-800">
                    No events found
                  </h3>
                  <p className="text-neutral-500 mt-2 text-sm max-w-sm mx-auto">
                    Try adjusting your category, location, or search term.
                  </p>
                </div>
              )}

            {!loading && !error && events.length === 0 && (
              <div className="w-full flex-1 flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-orange-400/40">
                <p className="text-4xl md:text-5xl mb-4 opacity-70">🏜️ </p>
                <h3 className="text-base md:text-lg font-semibold text-neutral-800">
                  Catalogue is empty
                </h3>
                <p className="text-neutral-500 mt-2 text-sm">
                  No events available right now.
                </p>
              </div>
            )}

            {!loading && currentItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((event) => {
                  const images = event.images || [];
                  const idx = sliderIndex[event.id] || 0;

                  return (
                    <div
                      key={event.id}
                      className="bg-white/65 backdrop-blur-2xl border border-[rgba(255,107,44,0.12)] rounded-[1.25rem] shadow-[0_4px_24px_rgba(255,107,44,0.07),0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-250 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,107,44,0.15),0_4px_12px_rgba(0,0,0,0.07)] flex flex-col overflow-hidden cursor-pointer group h-[400px]"
                      onClick={() => router.push(`/items/explore/${event.id}`)}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-t-2xl group/slider">
                        {images.length > 0 ? (
                          <>
                            <Image
                              src={images[idx]}
                              alt={event.title}
                              width={400}
                              height={224}
                              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {images.length > 1 && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSliderIndex((prev) => ({
                                      ...prev,
                                      [event.id]:
                                        (idx - 1 + images.length) %
                                        images.length,
                                    }));
                                  }}
                                  className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-neutral-800 backdrop-blur-md transition-all shadow-md opacity-0 group-hover/slider:opacity-100 z-10"
                                >
                                  <ArrowLeft size={14} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSliderIndex((prev) => ({
                                      ...prev,
                                      [event.id]: (idx + 1) % images.length,
                                    }));
                                  }}
                                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-neutral-800 backdrop-blur-md transition-all shadow-md opacity-0 group-hover/slider:opacity-100 z-10"
                                >
                                  <ArrowRight size={14} />
                                </button>

                                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-2 bg-white/10 backdrop-blur-2xl rounded-full border border-neutral-400/40">
                                  {images.map((_, i) => (
                                    <div
                                      key={i}
                                      className={`h-1 rounded-full transition-all duration-300 ${idx === i ? "bg-black w-4" : "bg-black w-1.5"}`}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div
                            className={`w-full h-full bg-gradient-to-br flex items-center justify-center`}
                          >
                            <span className="text-white/60 text-4xl font-light select-none">
                              {event.title?.charAt(0)?.toUpperCase() ?? "E"}
                            </span>
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
                          {event.title || "\u00A0"}
                        </h2>

                        <div className="h-4 flex items-center gap-1 text-xs text-neutral-400">
                          {event.location || event.country ? (
                            <MapPin
                              size={11}
                              className="text-orange-400 shrink-0"
                            />
                          ) : (
                            <div className="w-[11px] shrink-0" />
                          )}
                          <span className="truncate">
                            {[event.location, event.country]
                              .filter(Boolean)
                              .join(", ") || "\u00A0"}
                          </span>
                        </div>

                        <div className="h-9 text-xs text-neutral-500 overflow-hidden line-clamp-2 leading-relaxed mt-1 [&_a]:text-orange-500 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:ml-2 [&_p]:inline [&_p]:mr-1">
                          {event.description ? (
                            <Markdown>{event.description}</Markdown>
                          ) : (
                            "\u00A0"
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/items/explore/${event.id}`);
                          }}
                          className="mt-auto pt-3 flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-600 transition group/btn cursor-pointer"
                        >
                          View Details
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {Array.from({
                  length: Math.max(0, itemsPerPage - currentItems.length),
                }).map((_, i) => (
                  <div
                    key={`phantom-${i}`}
                    className="invisible pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    <div className="bg-white/65 backdrop-blur-2xl border border-[rgba(255,107,44,0.12)] rounded-[1.25rem] shadow-[0_4px_24px_rgba(255,107,44,0.07),0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-250 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,107,44,0.15),0_4px_12px_rgba(0,0,0,0.07)] flex flex-col overflow-hidden group h-[400px]" />
                  </div>
                ))}
              </div>
            )}

            {loading ? (
              <div className="mt-auto w-full">
                <SkeletonPagination />
                <div className="flex justify-center mt-12">
                  <SkeletonText className="h-4 w-40" />
                </div>
              </div>
            ) : !error && (
              <div className="mt-auto w-full">
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-10">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-xl border border-orange-400/60 text-neutral-500 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-30 transition cursor-pointer"
                    >
                      <ChevronLeft size={15} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-xl text-sm ${currentPage === i + 1
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
                      className="w-8 h-8 flex items-center justify-center rounded-xl border border-orange-400/60 text-neutral-500 hover:bg-orange-50 hover:text-orange-600 disabled:opacity-30 transition cursor-pointer"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                )}

                {filtered.length > 0 && (
                  <p className="text-center text-[11px] md:text-xs text-neutral-400 mt-12 font-medium">
                    Showing {startIndex + 1}–
                    {Math.min(startIndex + itemsPerPage, filtered.length)} of{" "}
                    {filtered.length}
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
      </section>
    </div>
  );
};

export default ExplorePage;
