import { getCollection } from "astro:content";
import { formatPeriod } from "./experience-format";

export { formatPeriod };

export async function loadExperience() {
  const entries = await getCollection("experience");
  return [...entries].sort((a, b) => b.data.start - a.data.start);
}
