export interface WorkLike {
  id: string;
  data: { order: number; featured: boolean };
}

export function sortAndValidateWorks<T extends WorkLike>(works: readonly T[]): T[] {
  if (works.length === 0) {
    throw new Error(
      "Works が 0 件です。@astrojs/mdx が astro.config.mjs で未設定だと、警告だけで空のコレクションになります。"
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
