import { getCollection } from "astro:content";

const EXPECTED_EXPERIENCE_COUNT = 2;

export function formatPeriod(start: number, end: number | null): string {
  return `${start} — ${end ?? "NOW"}`;
}

export async function loadExperience() {
  const entries = await getCollection("experience");
  if (entries.length !== EXPECTED_EXPERIENCE_COUNT) {
    throw new Error(
      `Experience の件数が期待値と一致しません（期待 ${EXPECTED_EXPERIENCE_COUNT} 件、実際 ${entries.length} 件）。`
    );
  }
  return [...entries].sort((a, b) => b.data.start - a.data.start);
}
