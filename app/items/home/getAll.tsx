"use client";

import { useEffect, useState } from "react";
import { getAllEvents } from "../component/utils/contentful";
import { Event } from "../component/utils/type";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import Markdown from "react-markdown";

export default function GetAll() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const itemsPerPage = 9;
  const boxHeight = 245;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllEvents<Event>();
        const formatted = res.map((item) => ({
          id: item.sys.id,
          title: item.fields.title || "Tanpa Nama",
          country: item.fields.country || "-",
          description: item.fields.description || "",
        }));
        setEvents(formatted);
      } catch (err) {
        console.error("Gagal ambil event", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Memuat data...</p>;

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);
  const fillerCount = itemsPerPage - currentEvents.length;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-24 xl:px-40 2xl:px-52 max-w-7xl mx-auto py-20 mb-32">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-10 text-center">
        Daftar Event
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada event tersedia.</p>
      ) : (
        <>
          {/* Grid responsif */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentEvents.map((event) => (
              <div
                key={event.id}
                className="p-5 border rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white"
                style={{ minHeight: `${boxHeight}px` }}
              >
                <div>
                  <h2 className="font-semibold text-lg line-clamp-2 mb-2 h-14">
                    {event.title}
                  </h2>
                  <p className="text-sm font-bold text-gray-600 mb-2">
                    Location: {event.country}
                  </p>
                  <div className="text-sm text-gray-700 line-clamp-2">
                    <Markdown>{event.description}</Markdown>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/items/serp/${event.id}`)}
                  className="mt-4 inline-flex items-center justify-center gap-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full px-4 py-2 text-sm font-medium transition"
                >
                  Lihat Detail <FaArrowRight size={14} />
                </button>
              </div>
            ))}

            {/* filler untuk jaga grid tetap stabil */}
            {Array.from({ length: fillerCount }).map((_, i) => (
              <div
                key={`filler-${i}`}
                className="p-4 border rounded-xl bg-transparent"
                style={{ minHeight: `${boxHeight}px` }}
              />
            ))}
          </div>

          {/* pagination */}
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
