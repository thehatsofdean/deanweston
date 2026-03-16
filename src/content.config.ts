import { defineCollection, z } from "astro:content";

const journal = defineCollection({
  type: "content",
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
