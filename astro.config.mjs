import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
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
  output: "server",
  adapter: vercel(),

  image: {
    service: squooshImageService(),
  },
});
