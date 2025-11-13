"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { fetchEntries } from "../component/utils/contentful";
import { Event } from "../component/utils/type";
import Markdown from "react-markdown";


export default function SerpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams?.get("id") || ""

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState(urlQuery);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) fetchEvents(query);
      else setEvents([]);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  const fetchEvents = async (q: string) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetchEntries<Event>("blogPost", q);
      const formatted: Event[] = res.items.map((item) => ({
        id: item.sys.id,
        title: item.fields.title || "Tanpa Nama",
        country: item.fields.country || "-",
        description: item.fields.description || "", 
              }));
      setEvents(formatted);
    } catch {
      setEvents([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col items-center py-40">
      <h1 className="text-2xl font-medium mb-8">Daftar Event</h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-8 px-6">
         <input
            type="text"
            placeholder="Cari idEvent..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 px-2 pl-10 pr-4 rounded-full shadow-lg border border-[#440806] focus:border-blue-500 focus:ring-2 focus:ring-[#ff6b35] outline-none transition duration-200 placeholder-[#fe4711]] text-gray-800"
          />         <FaSearch className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {/* Messages */}
      {loading && <p className="mt-10 text-gray-600">Memuat data...</p>}
      {error && <p className="text-red-500 mt-10">Terjadi kesalahan</p>}
      {!loading && events.length === 0 && query && (
        <p className="mt-10 text-gray-500">Event tidak ditemukan</p>
      )}

      {/* Event Grid */}
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12 max-w-6xl">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="p-5 border rounded-2xl shadow-lg hover:shadow-xl transition bg-white flex flex-col justify-between"
          >   
    
              <h2 className="font-semibold text-lg mb-2 h-16"><Markdown>{event.title}</Markdown></h2> 
              <p className="text-sm pb-3 font-bold">Location: {event.country}</p>
              <p className="text-sm line-clamp-2"> <Markdown>{event.description}</Markdown> </p> 
            <button
              onClick={() => router.push(`/items/serp/${event.id}`)}
              className="mt-4 inline-flex items-center justify-center gap-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2 font-medium transition"
            >
              Lihat Detail <FaArrowRight size={14} />
            </button>
          </div>
        ))}
      </div> 

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-10 flex-wrap justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200 transition"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded transition ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
