import { Pinecone } from "@pinecone-database/pinecone";
import type { Chunk, ChunkMetadata, RetrievedChunk } from "@/types/rag";
import { EMBEDDING_DIMENSIONS } from "./embeddings";

const INDEX_NAME = process.env.PINECONE_INDEX ?? "portfolio-rag";

function client() {
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) {
    throw new Error("PINECONE_API_KEY is not set");
  }
  return new Pinecone({ apiKey });
}

/** Creates the index if it doesn't exist yet — one less manual dashboard step. */
export async function ensureIndex(): Promise<void> {
  const pc = client();
  const { indexes } = await pc.listIndexes();
  if (indexes?.some((index) => index.name === INDEX_NAME)) return;

  await pc.createIndex({
    name: INDEX_NAME,
    dimension: EMBEDDING_DIMENSIONS,
    metric: "cosine",
    spec: { serverless: { cloud: "aws", region: "us-east-1" } },
    waitUntilReady: true,
  });
}

export async function upsertChunks(
  chunks: Chunk[],
  embeddings: number[][],
): Promise<void> {
  const index = client().index(INDEX_NAME);
  const records = chunks.map((chunk, i) => ({
    id: chunk.id,
    values: embeddings[i],
    metadata: chunk.metadata as unknown as Record<string, string>,
  }));

  const BATCH_SIZE = 100;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    await index.upsert({ records: records.slice(i, i + BATCH_SIZE) });
  }
}

export async function queryTopK(
  queryEmbedding: number[],
  topK = 5,
): Promise<RetrievedChunk[]> {
  const index = client().index(INDEX_NAME);
  const result = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
  });

  return (result.matches ?? []).map((match) => {
    const metadata = match.metadata as unknown as ChunkMetadata;
    return {
      id: match.id,
      text: metadata.text,
      metadata,
      score: match.score ?? 0,
    };
  });
}
