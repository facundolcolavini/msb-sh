import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true
  },
  adapter: vercel({
    edgeMiddleware: true,
  }),
  integrations: [db(), tailwind(), icon(), preact()],
  output: "server",
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  }
});