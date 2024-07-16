import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import preact from "@astrojs/preact";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [db(), tailwind(), icon(), preact(), playformCompress(
    {

        CSS: true,
        HTML: {
          'html-minifier-terser': {
            removeAttributeQuotes: false,
          },
        },
        Image: true,
        JavaScript: true,
        SVG: true,
        Logger: 1,
    
    }
  )],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  }
});