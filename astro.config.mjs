import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.deanweston.co.uk",
  vite: {
    build: {
      minify: true, // or 'esbuild'
    },
  },
});
