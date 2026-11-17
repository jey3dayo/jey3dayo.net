import { getCollection } from "astro:content";

const EXPECTED_WORKS_COUNT = 4;

interface WorkLike {
  id: string;
  data: { order: number; featured: boolean };
}

function sortAndValidateWorks<T extends WorkLike>(works: readonly T[]): T[] {
  if (works.length !== EXPECTED_WORKS_COUNT) {
    throw new Error(
      `Works の件数が期待値と一致しません（期待 ${EXPECTED_WORKS_COUNT} 件、実際 ${works.length} 件）。` +
        "0 件の場合は @astrojs/mdx が astro.config.mjs で未設定だと、警告だけで空のコレクションになります。"
    );
  }

  const featured = works.filter((work) => work.data.featured);
  if (featured.length !== 1) {
    throw new Error(
      `featured な Works はちょうど 1 件にしてください（実際 ${featured.length} 件: ${
        featured.map((work) => work.id).join(", ") || "なし"
      }）。`
    );
  }

  const sorted = [...works].sort((a, b) => a.data.order - b.data.order);
  const duplicated = sorted.filter(
    (work, index) => index > 0 && sorted[index - 1]?.data.order === work.data.order
  );
  if (duplicated.length > 0) {
    throw new Error(
      `Works の order が重複しています: ${duplicated
        .map((work) => `${work.id}（order: ${work.data.order}）`)
        .join(", ")}。`
    );
  }

  return sorted;
}

export async function loadWorks() {
  return sortAndValidateWorks(await getCollection("works"));
}
