import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
  }),
  schema: ({ image }) =>z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().default("Dominik"),
    tags: z.array(z.string()).default([]),
    hero: image().optional(),
    heroAlt: z.string().optional(),
  }),
});

export const collections = {
  blog,
};