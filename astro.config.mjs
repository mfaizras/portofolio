// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from '@astrojs/react';

import sitemap from "@astrojs/sitemap";
import config from "./src/data/config.json";

// https://astro.build/config
export default defineConfig({
  site: config.url,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()]
});