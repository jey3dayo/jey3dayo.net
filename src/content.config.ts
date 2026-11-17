import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const works = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      order: z.number().int().positive(),
      featured: z.boolean().default(false),
      links: z
        .array(
          z.object({
            kind: z.enum(["site", "github"]),
            href: z.url({ protocol: /^https?$/ }),
          })
        )
        .min(1),
      image: image().nullable().default(null),
    }),
});

const experience = defineCollection({
  loader: file("src/content/experience.yaml"),
  schema: z
    .object({
      start: z.number().int(),
      end: z.number().int().nullable(),
      role: z.string(),
      company: z.string(),
      description: z.string(),
    })
    .refine(({ start, end }) => end === null || end >= start, {
      message: "end は start 以降か null（現職）にする",
    }),
});

export const collections = { works, experience };
