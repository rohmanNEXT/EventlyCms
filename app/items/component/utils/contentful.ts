// contentful.ts
import { ContentfulEntry } from "./type"; // sesuaikan path

const SPACE_ID = "ynf5s7448k9w";
const ACCESS_TOKEN = "VbrwqRIjaTozjYovVeAZAUzaa863gnkkF3U2W15zdyc";

const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

// 🔹 Ambil semua event
export async function getAllEvents<T>() {
  const res = await fetch(
    `${BASE_URL}/entries?access_token=${ACCESS_TOKEN}`,
    { cache: "no-store" }
  );
// dont use .... &content_type=event : at last url because making error of fecth all data
  if (!res.ok) throw new Error("Gagal ambil data event");

  const data = await res.json();
  return data.items as ContentfulEntry<T>[];
}

export async function fetchEntryById<T>(id: string) {
  const res = await fetch(`${BASE_URL}/entries/${id}?access_token=${ACCESS_TOKEN}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Entry not found");
  return (await res.json()) as ContentfulEntry<T>;
}

export async function fetchEntries<T>(contentType: string, searchTerm?: string) {
  const url = new URL(`${BASE_URL}/entries`);
  url.searchParams.set("access_token", ACCESS_TOKEN);
  url.searchParams.set("content_type", contentType);
  if (searchTerm) url.searchParams.set("fields.title[match]", searchTerm);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Fetch entries failed");

  return (await res.json()) as { items: ContentfulEntry<T>[] };
}
