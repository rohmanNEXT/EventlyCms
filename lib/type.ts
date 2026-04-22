// types.ts
export type Event = {
  id: string;
  title: string;
  country: string;
  location?: string;
  description?: string;
  category?: string;
  image?: string;
  images?: string[];
  link?: string;
  author?: string;
};

export interface ContentfulLink {
  sys: {
    id: string;
    type: "Link";
    linkType: "Asset" | "Entry";
  };
}

export type ContentfulEntry<T> = {
  sys: { id: string };
  fields: T;
  includes?: {
    Asset?: ContentfulAsset[];
  }
};

export interface ContentfulAsset {
  sys: { id: string };
  fields: {
    file: {
      url: string;
      details?: {
        size: number;
        image?: { width: number; height: number };
      };
      fileName: string;
      contentType: string;
    };
    title: string;
  };
}

export interface ContentfulResponse<T> {
  items: ContentfulEntry<T>[];
  includes?: {
    Asset?: ContentfulAsset[];
  };
}

export type AnalyticsData = {
  date: string;
  visitors: number;
};

export type AnalyticsStats = {
  pageviews: AnalyticsData[];
  totalVisitors: number;
  totalPageviews: number;
  activeNow: number;
};
