// contentful.ts
import { ContentfulEntry, ContentfulAsset, ContentfulLink, ContentfulResponse } from "./type";

const SPACE_ID = "ynf5s7448k9w";
const ACCESS_TOKEN = "VbrwqRIjaTozjYovVeAZAUzaa863gnkkF3U2W15zdyc";
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

// Fetch all events (WITH ASSETS)
export async function getAllEvents<T>(): Promise<ContentfulResponse<T>> {
  console.log("getAllEvents: start fetch");

  const res = await fetch(
    `${BASE_URL}/entries?access_token=${ACCESS_TOKEN}&include=2`,
    { cache: "no-store" }
  );

  console.log("getAllEvents: response status =", res.status);

  if (!res.ok) {
    console.log("getAllEvents: fetch failed");
    throw new Error("Failed to fetch events");
  }

  const data = await res.json();
  console.log("getAllEvents: items =", data.items);
  console.log("getAllEvents: assets =", data.includes?.Asset);

  return data;
}

// Fetch single entry by ID (WITH ASSETS)
export async function fetchEntryById<T>(id: string): Promise<ContentfulEntry<T>> {
  console.log("fetchEntryById: id =", id);

  const res = await fetch(
    `${BASE_URL}/entries?sys.id=${id}&access_token=${ACCESS_TOKEN}&include=2`,
    { cache: "no-store" }
  );

  console.log("fetchEntryById: response status =", res.status);

  if (!res.ok) {
    console.log("fetchEntryById: entry not found");
    throw new Error("Entry not found");
  }

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("Entry not found");
  }

  // Attach includes to the entry item for easy access in the frontend
  const entry = data.items[0];
  // Safe assignment, avoiding direct mutation if strict
  const finalEntry = { ...entry, includes: data.includes };

  console.log("fetchEntryById: entry =", finalEntry);
  console.log("fetchEntryById: assets =", data.includes?.Asset);

  return finalEntry;
}

// Search / filter entries
export async function fetchEntries<T>(contentType: string, searchTerm?: string): Promise<ContentfulResponse<T>> {
  console.log("fetchEntries: contentType =", contentType);
  console.log("fetchEntries: searchTerm =", searchTerm);

  const url = new URL(`${BASE_URL}/entries`);
  url.searchParams.set("access_token", ACCESS_TOKEN);
  url.searchParams.set("content_type", contentType);
  url.searchParams.set("include", "2");

  if (searchTerm) {
    url.searchParams.set("fields.title[match]", searchTerm);
  }

  console.log("fetchEntries: url =", url.toString());

  const res = await fetch(url.toString(), { cache: "no-store" });

  console.log("fetchEntries: response status =", res.status);

  if (!res.ok) {
    console.log("fetchEntries: fetch failed");
    throw new Error("Fetch entries failed");
  }

  const data = await res.json();
  console.log("fetchEntries: items =", data.items);
  console.log("fetchEntries: assets =", data.includes?.Asset);

  return data;
}

// Resolve a single asset link { sys: { id } } against the includes array
export function resolveAssetUrl(link: ContentfulLink, includes: ContentfulAsset[]): string {
  const assetId = link?.sys?.id;
  if (!assetId) return "";
  const asset = includes?.find((a: ContentfulAsset) => a.sys.id === assetId);
  const url = asset?.fields?.file?.url;
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
}

// Ambil image URL dari includes Asset
export function getImageUrl(entry: ContentfulEntry<unknown>, includes: ContentfulAsset[]): string | undefined {
  console.log("getImageUrl: entry =", entry);

  let imageId;
  
  const fields = entry.fields as { image?: ContentfulLink | ContentfulLink[]; images?: ContentfulLink | ContentfulLink[] };
  if (Array.isArray(fields?.image) && fields.image.length > 0) {
    imageId = fields.image[0]?.sys?.id;
  } else if (fields?.image && !Array.isArray(fields.image)) {
    imageId = fields.image.sys.id;
  }
  
  if (!imageId && Array.isArray(fields?.images) && fields.images.length > 0) {
    imageId = fields.images[0]?.sys?.id;
  } else if (!imageId && fields?.images && !Array.isArray(fields.images)) {
    imageId = fields.images.sys.id;
  }
  

  if (!imageId) return undefined;

  const asset = includes?.find((item: ContentfulAsset) => item.sys.id === imageId);
  console.log("getImageUrl: asset =", asset);

  const url = asset?.fields?.file?.url;
  console.log("getImageUrl: raw url =", url);

  if (!url) return undefined;

  const finalUrl = url.startsWith("//") ? `https:${url}` : url;
  console.log("getImageUrl: final url =", finalUrl);

  return finalUrl;
}