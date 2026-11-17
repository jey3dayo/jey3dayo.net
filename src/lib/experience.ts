import { getCollection } from "astro:content";

export function formatPeriod(start: number, end: number | null): string {
  return `${start} — ${end ?? "NOW"}`;
}

export async function loadExperience() {
  const entries = await getCollection("experience");
  return [...entries].sort((a, b) => b.data.start - a.data.start);
}
