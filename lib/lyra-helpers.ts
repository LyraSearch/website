export type Hit = {
  description: string;
  date: string;
  granularity: string;
  categories: {
    category1: string;
    category2: string;
  };
};

export type SearchResult = {
  count: number;
  hits: Hit[];
  elapsed: bigint;
};

export const schema = {
  date: "string",
  description: "string",
  categories: {
    category1: "string",
    category2: "string",
  },
  granularity: "string",
};
