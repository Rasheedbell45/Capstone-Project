import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "dist",   // Vercel will use this folder
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: true,
  },
});
