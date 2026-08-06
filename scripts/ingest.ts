import { buildCorpus } from "@/lib/rag/corpus";
import { embedDocuments } from "@/lib/rag/embeddings";
import { ensureIndex, upsertChunks } from "@/lib/rag/vectorstore";

async function main() {
  const missing = ["GEMINI_API_KEY", "PINECONE_API_KEY"].filter(
    (key) => !process.env[key],
  );
  if (missing.length > 0) {
    console.error(`Missing required env var(s): ${missing.join(", ")}`);
    console.error(
      "Add them to .env.local (see .env.local.example for where to get each key), then re-run `npm run ingest`.",
    );
    process.exit(1);
  }

  console.log("Building corpus from about/projects/experience/blog...");
  const corpus = buildCorpus();
  console.log(`${corpus.length} chunks.`);

  console.log("Ensuring Pinecone index exists...");
  await ensureIndex();

  console.log("Embedding chunks via Gemini...");
  const embeddings = await embedDocuments(corpus.map((c) => c.text));

  console.log("Upserting to Pinecone...");
  await upsertChunks(corpus, embeddings);

  console.log(`Done — ${corpus.length} chunks indexed. The chatbot is live.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
