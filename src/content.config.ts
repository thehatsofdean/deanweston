import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const journal = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    readTime: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  journal,
};
