import vercel from '@astrojs/vercel/serverless';
import preact from "@astrojs/preact";

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig, squooshImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    preact({
      include: ["**/preact/*"],
    }),
    icon(),
  ],
  output: 'hybrid',
  adapter: vercel(),
  image: {
    service: squooshImageService(),
  },
});
