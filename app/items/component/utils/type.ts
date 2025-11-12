// types.ts
export type Event = {
   description?: string;
  image?: string;
  link?: string;
   id: string;
  title: string;
  country: string;};

export type ContentfulEntry<T> = {
  sys: { id: string };
  fields: T;
};
