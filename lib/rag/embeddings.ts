import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

const EMBEDDING_MODEL = "gemini-embedding-001";

/**
 * Fixed at 768 so it matches the Pinecone index dimension the ingest
 * script creates. Gemini's embedding model supports larger dimensions
 * (up to 3072) but 768 is plenty for a personal-site corpus and keeps
 * the free-tier index small.
 */
export const EMBEDDING_DIMENSIONS = 768;

export async function embedDocuments(texts: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({
    model: google.textEmbeddingModel(EMBEDDING_MODEL),
    values: texts,
    providerOptions: {
      google: {
        outputDimensionality: EMBEDDING_DIMENSIONS,
        taskType: "RETRIEVAL_DOCUMENT",
      },
    },
  });
  return embeddings;
}

export async function embedQuery(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: google.textEmbeddingModel(EMBEDDING_MODEL),
    value: text,
    providerOptions: {
      google: {
        outputDimensionality: EMBEDDING_DIMENSIONS,
        taskType: "RETRIEVAL_QUERY",
      },
    },
  });
  return embedding;
}
