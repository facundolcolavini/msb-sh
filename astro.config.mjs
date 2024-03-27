import vercel from '@astrojs/vercel/serverless';
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig, squooshImageService } from "astro/config";

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact({
    include: ["**/preact/*"]
  }), icon(), db()],
  output: 'hybrid',
  adapter: vercel(),
  image: {
    service: squooshImageService()
  }
});