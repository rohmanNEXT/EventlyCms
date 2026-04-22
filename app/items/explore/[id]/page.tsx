"use client";

import React, { useEffect, useState, useLayoutEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchEntryById, resolveAssetUrl } from "../../../../lib/contentful";
import { Event } from "../../../../lib/type";
import Markdown from "react-markdown";
import Image from "next/image";
import { ArrowLeft, MapPin, Tag, ArrowRight, BadgeCheck } from "lucide-react";
import { ContentfulLink } from "../../../../lib/type";

interface EventFields {
  title?: string;
  country?: string;
  location?: string | { lat: number; lon: number };
  description?: string;
  category?: string;
  author?: string;
  image?: ContentfulLink | ContentfulLink[];
  images?: ContentfulLink | ContentfulLink[];
}

const EventDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : "";

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Custom Inline Slider State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const raw = await fetchEntryById<EventFields>(id);
        const images: string[] = [];

        if (raw.fields.image) {
          const arr = Array.isArray(raw.fields.image) ? raw.fields.image : [raw.fields.image];
          arr.forEach((ref) => {
            const imgUrl = resolveAssetUrl(ref, raw.includes?.Asset || []);
            if (imgUrl) images.push(imgUrl);
          });
        }

        if (raw.fields.images) {
          const arr = Array.isArray(raw.fields.images) ? raw.fields.images : [raw.fields.images];
          arr.forEach((ref) => {
            const imgUrl = resolveAssetUrl(ref, raw.includes?.Asset || []);
            if (imgUrl) images.push(imgUrl);
          });
        }

        const loc = raw.fields.location;
        const locationStr = typeof loc === "string" ? loc : (loc && loc.lat ? `${loc.lat}, ${loc.lon}` : "");

        setEvent({
          id: raw.sys.id,
          title: raw.fields.title || "Untitled",
          country: raw.fields.country || "",
          location: locationStr,
          description: raw.fields.description || "",
          category: raw.fields.category || "",
          author: raw.fields.author || "Evently Team",
          image: images.length > 0 ? images[0] : "",
          images: images,
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const images = event?.images?.length ? event.images : (event?.image ? [event.image] : []);

  return (
    <div className="w-full flex-1 pb-10">
      {loading ? (
        /* Loading UI - Skeleton Removed */
        <div className="min-h-screen pt-28 pb-20 px-6">
        </div>
      ) : error || !event ? (
        /* Error/Not Found UI */
        <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-center px-6">
          <p className="text-5xl mb-4">🎪</p>
          <h2 className="text-xl font-semibold text-neutral-700 mb-2">Event not found</h2>
          <button
            onClick={() => router.back()}
            className="mt-4 px-5 py-2 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition cursor-pointer"
          >
            Go Back
          </button>
        </div>
      ) : (
        /* Main UI */
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-orange-600 transition mb-6 cursor-pointer group w-fit"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>

          {/* Inline Image slider */}
          {images.length > 0 && (
            <div className="mb-8 group/slider relative w-full h-[320px] md:h-[480px] rounded-3xl overflow-hidden bg-[#FFFAF7] border border-orange-400/40 shadow-sm">
              <Image
                src={images[currentImageIndex]}
                alt={event.title}
                width={800}
                height={480}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((p) => (p - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-neutral-800 backdrop-blur-md transition-all shadow-md opacity-0 group-hover/slider:opacity-100 z-10"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((p) => (p + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-neutral-800 backdrop-blur-md transition-all shadow-md opacity-0 group-hover/slider:opacity-100 z-10"
                  >
                    <ArrowRight size={18} />
                  </button>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-2 bg-white/10 backdrop-blur-2xl rounded-full border border-neutral-400/40">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${currentImageIndex === i ? 'bg-black w-4' : 'bg-black w-1.5'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          <div className="flex flex-col items-center text-center">
            {/* Category badge */}
            {event.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-400/40 text-xs font-medium text-orange-600 mb-4">
                <Tag size={11} />
                {event.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl font-semibold text-neutral-900 leading-tight mb-3">
              {event.title}
            </h1>

            {/* Author & Link Tujuan */}
            <div className="flex flex-col items-center gap-5 mt-4 mb-8">
              {/* Author Profile */}
              <div className="flex items-center gap-3 bg-[#FFFAF7] px-4 py-2 rounded-full border border-orange-400/40 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden border border-orange-400/40 shrink-0">
                  <Image 
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent((event?.author || event?.id || 'evently').trim())}`} 
                    alt="Author" 
                    width={32}
                    height={32}
                    unoptimized
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-left pr-2">
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold text-neutral-800 leading-none">
                    {event.author}
                    <BadgeCheck size={14} className="text-blue-500 fill-blue-50" />
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5 uppercase tracking-wide">Event Publisher</p>
                </div>
              </div>

              {/* Link Tujuan */}
              <a
                href={`/items/serp/${event.id}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 hover:opacity-90 text-white text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgb(249,115,22,0.39)]"
              >
                <span>Book Now </span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Description */}
            {event.description && (
              <article className="w-full flex flex-col items-center text-center text-sm md:text-base text-neutral-600 leading-relaxed space-y-4 [&_a]:text-orange-500 [&_a]:hover:underline [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:inline-block [&_ul]:text-left [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:inline-block [&_ol]:text-left [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-semibold [&_li]:mb-1 [&_p]:mb-4 mb-10">
                <Markdown>{event.description}</Markdown>
              </article>
            )}
          </div>

          {/* Location UI Card & Map */}
          {(event.location || event.country) && (() => {
            const isCoordinate = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test((event.location || "").trim());
            const mapQuery = isCoordinate ? event.location! : [event.location, event.country].filter(Boolean).join(", ");
            
            return (
              <div className="mt-12 space-y-6">
                {/* Location Text Card */}
                <div className="overflow-hidden rounded-2xl bg-[#FFFAF7] border border-orange-400/40 shadow-sm">
                  <div className="flex flex-col items-center text-center gap-3 p-6">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm border border-orange-400/40">
                      <MapPin size={18} className="text-orange-600" />
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-1">Event Location</p>
                      <p className="text-base font-semibold text-neutral-800 leading-tight">
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-orange-500 transition-colors"
                        >
                          {[event.location, event.country].filter(Boolean).join(", ")}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Card */}
                <div className="w-full h-96 bg-orange-50/50 rounded-2xl overflow-hidden border border-orange-400/40 shadow-sm relative">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;