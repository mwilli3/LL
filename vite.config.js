import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// Multi-page build: one Vite project, seven HTML entry points.
// `npm run build` emits dist/<name>.html for all seven apps.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        calm: resolve(__dirname, "calm.html"),
        rooted: resolve(__dirname, "rooted.html"),
        reclaim: resolve(__dirname, "reclaim.html"),
        quiz: resolve(__dirname, "quiz.html"),
        "regulation-mastery": resolve(__dirname, "regulation-mastery.html"),
        "boundary-mastery": resolve(__dirname, "boundary-mastery.html"),
        "rooted-challenge": resolve(__dirname, "rooted-challenge.html"),
        index: resolve(__dirname, "index.html"),
      },
    },
  },
});
