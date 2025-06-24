import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/lendsqr-fe-test/",
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
