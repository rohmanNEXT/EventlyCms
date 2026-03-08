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
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-3">
            Event tidak ditemukan
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            ID event salah atau data tidak tersedia
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
      <article className="w-full max-w-4xl">
        
        <header className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            {data.title || "Tanpa Nama"}
          </h1>

          <p className="text-gray-600 text-sm sm:text-base">
            {data.country || "-"}
          </p>
        </header>

        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-800 leading-relaxed">
          <Markdown>{data.description}</Markdown>
        </div>

      </article>
    </section>
  );
}