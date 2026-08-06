export type ChunkMetadata = {
  source: "about" | "project" | "experience" | "blog";
  title: string;
  url?: string;
  text: string;
};

export type Chunk = {
  id: string;
  text: string;
  metadata: ChunkMetadata;
};

export type RetrievedChunk = Chunk & {
  score: number;
};
