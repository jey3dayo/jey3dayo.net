import { getCollection } from "astro:content";
import { sortAndValidateWorks } from "./works-validation";

export async function loadWorks() {
  return sortAndValidateWorks(await getCollection("works"));
}
