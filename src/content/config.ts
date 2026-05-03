import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
        tags: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
	schema: () => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date().optional(),
		categories: z.array(z.enum(["web", "api", "ai"]))
			.min(1),
		order: z.number().int().optional(),
		featured: z.boolean().optional(),
		stars: z.union([z.number(), z.string()]).optional(),
		techStack: z.array(
			z.union([
				z.string(),
				z.object({
					label: z.string(),
					icon: z.string().optional(),
				}),
			])
		).min(1),
		demo: z.string().url().optional(),
		github: z.string().url().optional(),
		blog: z.string().url().optional(),
		heroImage: z.string().optional(),
		gallery: z.array(z.string()).optional(),
	}),
});

export const collections = { blog, projects };
