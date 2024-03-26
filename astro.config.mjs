import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import netlify from '@astrojs/netlify';
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [db(), tailwind(), icon(), preact()],
  output: "server",
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  }
});