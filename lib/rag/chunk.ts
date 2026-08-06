const MAX_CHARS = 800;
const OVERLAP_CHARS = 100;

/**
 * Splits long-form markdown into retrieval-sized chunks: first by H2
 * heading (each section is usually a coherent unit), then any section
 * still over MAX_CHARS is further split into overlapping windows so no
 * chunk is too large to embed meaningfully.
 */
export function chunkMarkdown(source: string): string[] {
  const sections = source
    .split(/\n(?=##\s)/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  for (const section of sections) {
    if (section.length <= MAX_CHARS) {
      chunks.push(section);
      continue;
    }
    for (let i = 0; i < section.length; i += MAX_CHARS - OVERLAP_CHARS) {
      chunks.push(section.slice(i, i + MAX_CHARS));
    }
  }
  return chunks;
}
