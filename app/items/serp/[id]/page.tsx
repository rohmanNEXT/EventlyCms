import Markdown from "react-markdown";
import { fetchEntryById } from "../../component/utils/contentful";
import { Event } from "../../component/utils/type";
interface DetailPageProps {
  params: { id: string };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  let data: Event | null = null;

  try {
    const entry = await fetchEntryById<Event>(id);
    data = entry.fields;
  } catch {
    data = null; // jika gagal fetch
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-3xl font-bold mb-4">Event tidak ditemukan</h1>
        <p className="text-gray-600">
          ID event mungkin salah atau data tidak tersedia.
        </p>
      </div>
    );
  }

  // JSX untuk data valid
  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 py-16">
<div className="flex flex-col items-center justify-center text-center 
px-4 sm:px-6 md:px-12 lg:px-40 w-full max-w-5xl h-screen">

  
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4">
          {data.title || "Tanpa Nama"}
        </h1>

        <p className="text-gray-700 text-sm sm:text-base mb-10">
          {data.country || "-"}
        </p>

        <div className="prose prose-sm sm:prose-base lg:prose-lg text-gray-800 leading-relaxed text-justify max-w-none">
          <Markdown>{data.description}</Markdown>
        </div>         </div> </div>
  );
}
